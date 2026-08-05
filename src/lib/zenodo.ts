export type ZenodoPaper = {
  num: string;
  title: string;
  authors: string;
  abstract: string;
  tags: string[];
  patentTag: string | null;
  date: string;
  patentId: string | null;
  zenodoUrl: string;
  ssrnUrl: string;
};

// USPTO provisional application numbers aren't in Zenodo metadata — mapped here by
// the paper's Zenodo version tag (e.g. "AUGLE-005P-v1" -> "AUGLE-005P"). Papers
// published without a matching AUGLE-00XP version tag simply show no patent badge.
const PATENT_BY_CODE: Record<string, string> = {
  "AUGLE-001P": "64/082,269",
  "AUGLE-002P": "64/088,094",
  "AUGLE-003P": "64/090,101",
  "AUGLE-004P": "64/090,105",
  "AUGLE-005P": "64/094,556",
  "AUGLE-006P": "64/094,568",
  "AUGLE-007P": "64/094,580",
};

// Paper 01's Zenodo record has no "version" metadata field set, so the
// AUGLE-00XP code can't be extracted from it like the other six papers.
// Mapped here by DOI as a fallback until the record's metadata is fixed.
const CODE_BY_DOI: Record<string, string> = {
  "10.5281/zenodo.21443526": "AUGLE-001P", // Augle: A Seven-Agent Deliberative Ensemble...
};

// SSRN has no public API (unlike Zenodo) — abstract IDs are mapped here by hand,
// keyed by the paper's Zenodo DOI. Unmapped papers fall back to the SSRN homepage.
const SSRN_BY_DOI: Record<string, string> = {
  "10.5281/zenodo.21443526": "6880718", // Augle: A Seven-Agent Deliberative Ensemble...
  "10.5281/zenodo.20777711": "6986399", // Source Verification as a First-Class Architectural Layer...
  "10.5281/zenodo.20777843": "6986458", // Round-Aware Evidence Admission...
  "10.5281/zenodo.20777970": "6986498", // Verdict Fragility as a First-Class Output...
  "10.5281/zenodo.20648630": "6922598", // Adversarial Pre-Submission Review in AI-Assisted Document Drafting...
  "10.5281/zenodo.20777779": "6986401", // Ground-Truth-Mapped Reasoning Corpus Generation...
  "10.5281/zenodo.20778024": "6986518", // Compounding Research Loops...
};

const HTML_ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  mdash: "—",
  ndash: "–",
  ldquo: "“",
  rdquo: "”",
  lsquo: "‘",
  rsquo: "’",
  hellip: "…",
};

// ponytail: covers the handful of entities/tags Zenodo's CKEditor output actually
// uses (seen in practice) — not a general HTML parser. Add to HTML_ENTITIES if a
// new one shows up in a future paper description.
function htmlToText(html: string): string {
  return html
    .replace(/<\/p>\s*<p>/gi, "\n\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/&(\w+);/g, (match, name) => HTML_ENTITIES[name] ?? match)
    .replace(/[ \t]+/g, " ")
    .trim();
}

// Zenodo creator names are stored "Last, First" — displayed elsewhere on the site as "First Last".
function formatAuthorName(name: string): string {
  const [last, first] = name.split(", ");
  return first ? `${first} ${last}` : name;
}

type ZenodoRecord = {
  doi: string;
  links: { self_html: string };
  metadata: {
    title: string;
    description?: string;
    publication_date: string;
    creators: { name: string }[];
    keywords?: string[];
    version?: string;
  };
};

export async function getZenodoPapers(): Promise<ZenodoPaper[]> {
  const res = await fetch("https://zenodo.org/api/records?q=augle&size=25", {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`Zenodo API returned ${res.status}`);

  const data: { hits: { hits: ZenodoRecord[] } } = await res.json();

  return data.hits.hits
    .slice()
    .sort((a, b) => a.metadata.publication_date.localeCompare(b.metadata.publication_date))
    .map((hit, i) => {
      const code = hit.metadata.version?.match(/AUGLE-\d+P/)?.[0] ?? CODE_BY_DOI[hit.doi] ?? null;
      const date = new Date(hit.metadata.publication_date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      return {
        num: `Paper ${String(i + 1).padStart(2, "0")} · ${code ?? "Zenodo"} · ${date}`,
        title: hit.metadata.title,
        authors: hit.metadata.creators.map((c) => formatAuthorName(c.name)).join(", "),
        abstract: htmlToText(hit.metadata.description ?? ""),
        tags: (hit.metadata.keywords ?? []).slice(0, 3),
        patentTag: code ? `Provisional: ${code}` : null,
        patentId: code ? (PATENT_BY_CODE[code] ?? null) : null,
        date,
        zenodoUrl: hit.links.self_html,
        ssrnUrl: SSRN_BY_DOI[hit.doi]
          ? `https://papers.ssrn.com/sol3/papers.cfm?abstract_id=${SSRN_BY_DOI[hit.doi]}`
          : "https://ssrn.com",
      };
    });
}

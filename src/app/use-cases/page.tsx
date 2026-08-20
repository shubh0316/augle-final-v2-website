import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CtaBanner } from "@/components/CtaBanner";
import { eyebrow, sectionTitle } from "@/lib/styles";

export const metadata: Metadata = {
  title: "Use Cases — Augle",
  description:
    "Browse Augle use cases across eleven verticals — hypothetical sessions showing how multi-agent deliberation serves researchers, analysts, and decision-makers.",
};

type PreviewCase = {
  name: string;
  persona: string;
  question: string;
  depth: "Rapid" | "Standard" | "Deep";
};

type Vertical = {
  slug: string;
  name: string;
  desc: string;
  cases: [PreviewCase, PreviewCase, PreviewCase];
};

const VERTICALS: Vertical[] = [
  {
    slug: "universities",
    name: "Universities + academia",
    desc: "PhD candidates, faculty researchers, and academic librarians stress-testing methodology claims, literature gaps, and dissertation arguments before submission or defence.",
    cases: [
      {
        name: "The Dissertation Defence",
        persona: "PhD Candidate, Cognitive Science · University of Edinburgh",
        question:
          "“Does experience sampling via smartphone provide sufficient ecological validity to support attentional state claims in naturalistic environments?”",
        depth: "Standard",
      },
      {
        name: "The Systematic Review Gap",
        persona: "Research Fellow, Public Health · UCL",
        question:
          "“What is the current state of evidence on whether screen time interventions reduce depressive symptoms in adolescents, and where are the critical gaps?”",
        depth: "Standard",
      },
      {
        name: "The Grant Proposal Review",
        persona: "Associate Professor, Materials Science · MIT",
        question:
          "“Is the evidence base for graphene-based supercapacitor energy density improvements sufficient to support the claims in this NSF proposal, and what will reviewers challenge?”",
        depth: "Deep",
      },
    ],
  },
  {
    slug: "research-labs",
    name: "Research labs",
    desc: "Corporate and independent research labs validating experimental findings, stress-testing publication claims, and reviewing competitive landscape assumptions before committing resources.",
    cases: [
      {
        name: "The Replication Concern",
        persona: "Senior Research Scientist · Pharmaceutical R&D Lab",
        question:
          "“Does the published evidence for CRISPR-based gene editing in post-mitotic neurons survive replication scrutiny, and which findings are most at risk?”",
        depth: "Deep",
      },
      {
        name: "The Technology Readiness Assessment",
        persona: "VP Research · Advanced Materials Company",
        question:
          "“Is the current evidence base sufficient to justify moving solid-state battery technology from TRL 4 to TRL 6 pilot production?”",
        depth: "Standard",
      },
      {
        name: "The Competitive Intelligence Review",
        persona: "Director of Strategy · Biotech Research Division",
        question:
          "“Does the published patent landscape for mRNA delivery mechanisms leave defensible white space for our proposed lipid nanoparticle approach?”",
        depth: "Standard",
      },
    ],
  },
  {
    slug: "policy",
    name: "Policy + lawmakers",
    desc: "Legislative staff, policy advisors, and regulatory analysts reviewing the evidence base behind proposed legislation and stress-testing counterarguments before committee hearings.",
    cases: [
      {
        name: "The Legislative Evidence Review",
        persona: "Senior Policy Advisor · UK Department for Education",
        question:
          "“Does the evidence base for smartphone bans in secondary schools support the policy position we're being asked to brief the Minister on?”",
        depth: "Standard",
      },
      {
        name: "The Regulatory Impact Assessment",
        persona: "Senior Analyst · Congressional Budget Office",
        question:
          "“What does the evidence say about the economic impact of minimum wage increases on small business employment in sectors with high labour cost exposure?”",
        depth: "Standard",
      },
      {
        name: "The Regulatory Forecast Brief",
        persona: "Policy Research Director · Think Tank",
        question:
          "“Will the EU AI Act's general-purpose AI provisions require material compliance changes for frontier model developers operating in EU member states by Q4 2025?”",
        depth: "Standard",
      },
    ],
  },
  {
    slug: "law-firms",
    name: "Law firms",
    desc: "Litigation partners, senior associates, and in-house counsel reviewing expert evidence, verifying case citations, and running opposing counsel's cross-examination before the hearing.",
    cases: [
      {
        name: "The Expert Evidence Review",
        persona: "Litigation Partner · Commercial Dispute · London Arbitration",
        question:
          "“Does our quantum expert's loss of profit calculation methodology withstand the methodological objections opposing counsel is likely to raise?”",
        depth: "Deep",
      },
      {
        name: "The Precedent Validity Check",
        persona: "Senior Associate · Regulatory Litigation · Financial Services",
        question:
          "“Does the line of authority our submissions rely on for 'reasonable steps' under the Consumer Duty remain good law in the current appellate landscape?”",
        depth: "Standard",
      },
      {
        name: "The Regulatory Applicability Review",
        persona: "In-house General Counsel · Technology Company · Pre-launch Compliance",
        question:
          "“Does our data processing architecture comply with the current UK GDPR regulatory framework, and which elements carry material enforcement risk?”",
        depth: "Standard",
      },
    ],
  },
  {
    slug: "venture-capital",
    name: "Venture capital + PE",
    desc: "VC partners, PE associates, and growth equity teams stress-testing investment theses, TAM assumptions, and acquisition diligence before investment committee.",
    cases: [
      {
        name: "The Investment Thesis Review",
        persona: "Principal · Series B Growth Fund · Pre-IC Memo Finalisation",
        question:
          "“Is the investment thesis for this vertical SaaS company's Series B defensible at IC, and what are the two or three objections we need to resolve before we go in?”",
        depth: "Standard",
      },
      {
        name: "The TAM Assumption",
        persona: "Partner · Growth Equity Fund · Pre-IC Diligence",
        question:
          "“Is the $3.8B TAM projection for this vertical SaaS product supported by the underlying market size and pricing assumptions?”",
        depth: "Rapid",
      },
      {
        name: "The Acquisition Diligence Review",
        persona: "VP · Mid-market PE Fund · Proprietary Deal · Pre-LOI",
        question:
          "“Do the revenue synergy assumptions in our acquisition model for this add-on hold under scrutiny, and what's the strongest case against our post-close integration timeline?”",
        depth: "Deep",
      },
    ],
  },
  {
    slug: "think-tanks",
    name: "Think tanks + nonprofits",
    desc: "Research directors, advocacy teams, and programme officers running adversarial pre-publication review on policy papers, campaign evidence bases, and grant-funded research claims.",
    cases: [
      {
        name: "The Pre-Publication Review",
        persona: "Research Director · Health Policy Think Tank · Pre-launch Paper Review",
        question:
          "“Does our paper's headline claim — that universal free school meals reduce childhood obesity rates by 18% — survive methodological scrutiny, and what will critics say?”",
        depth: "Standard",
      },
      {
        name: "The Advocacy Position Review",
        persona: "Campaign Director · Criminal Justice Reform Nonprofit",
        question:
          "“Is the evidence base for our campaign's central claim — that community supervision is more effective than incarceration at reducing reoffending — strong enough to withstand a hostile media cycle?”",
        depth: "Standard",
      },
      {
        name: "The Grant Research Evaluation",
        persona: "Programme Officer · Foundation · Evaluating Grantee Research Pre-funding",
        question:
          "“Does the evidence base cited in this grant application support the causal claims the applicant makes about their programme's impact on educational attainment?”",
        depth: "Deep",
      },
    ],
  },
  {
    slug: "enterprise",
    name: "Enterprise",
    desc: "Strategy teams, corporate development, and procurement functions stress-testing market entry analyses, vendor claims, and competitive intelligence before board-level decisions.",
    cases: [
      {
        name: "The Market Entry Review",
        persona: "VP Strategy · FTSE 100 Consumer Goods Company · Pre-board Recommendation",
        question:
          "“Does the evidence base in our Southeast Asia market entry analysis support the recommendation to commit £120M over three years, and what are the assumptions the board will challenge?”",
        depth: "Standard",
      },
      {
        name: "The Vendor Evaluation",
        persona: "Head of Procurement · Global Financial Services Firm · Enterprise Software Selection",
        question:
          "“Are the ROI claims in this vendor's enterprise proposal independently supported, and how should we weight their reference customer evidence?”",
        depth: "Standard",
      },
      {
        name: "The Competitive Intelligence Review",
        persona: "Director of Strategy · Global Technology Company · Annual Strategic Planning",
        question:
          "“Does our competitive landscape assessment accurately reflect the threat from the three challenger platforms, and what are we missing?”",
        depth: "Deep",
      },
    ],
  },
  {
    slug: "healthcare",
    name: "Healthcare + life sciences",
    desc: "Medical affairs teams, HTA analysts, and clinical research directors reviewing clinical evidence to the standard it will face from regulators, payers, and ERG reviewers.",
    cases: [
      {
        name: "The HTA Submission Review",
        persona: "Medical Affairs Director · Pharmaceutical Company · Pre-NICE Submission",
        question:
          "“Does our NICE submission dossier for this oncology indication present the clinical evidence in a way that will withstand the Evidence Review Group's scrutiny?”",
        depth: "Deep",
      },
      {
        name: "The Coverage Decision Review",
        persona: "Medical Director · Large US Health Plan · Formulary Committee Preparation",
        question:
          "“Is the clinical evidence presented in this prior authorisation request for a GLP-1 receptor agonist sufficient to support coverage for the requested indication?”",
        depth: "Standard",
      },
      {
        name: "The Trial Design Review",
        persona: "Clinical Research Director · Biotech · Phase III Trial Design Finalisation",
        question:
          "“Does our Phase III trial design for this rare disease indication adequately power the primary endpoint, and what will be challenged at the FDA pre-submission meeting?”",
        depth: "Standard",
      },
    ],
  },
  {
    slug: "government",
    name: "Government + public sector",
    desc: "Civil servants, policy teams, and legal advisors reviewing business cases, ministerial briefs, and decision records to the standard of NAO scrutiny, parliamentary committees, and judicial review.",
    cases: [
      {
        name: "The Business Case Review",
        persona: "Deputy Director, Strategy · Central Government Department · Pre-HM Treasury Submission",
        question:
          "“Does the Full Business Case for this digital transformation programme have a BCR and methodology that will withstand Treasury and NAO scrutiny?”",
        depth: "Standard",
      },
      {
        name: "The Ministerial Brief Review",
        persona: "Head of Analysis · Government Department · Pre-select Committee Appearance",
        question:
          "“Does the evidence base in the ministerial briefing pack for the select committee appearance on youth employment hold up, and what are the three questions the committee will ask?”",
        depth: "Standard",
      },
      {
        name: "The Judicial Review Risk Assessment",
        persona: "Legal Adviser · Central Government Department · Pre-publication Policy Decision",
        question:
          "“What is the strongest judicial review ground a claimant could use to challenge this planning policy decision, and does the evidence base adequately address it?”",
        depth: "Deep",
      },
    ],
  },
  {
    slug: "financial-services",
    name: "Financial services",
    desc: "Compliance teams, research analysts, and risk functions stress-testing compliance positions, equity research reports, and risk model assumptions before the regulator does.",
    cases: [
      {
        name: "The Compliance Position Review",
        persona: "Head of Compliance · Retail Investment Platform · Pre-FCA Supervisory Meeting",
        question:
          "“Does our Consumer Duty compliance position on the platform's default fund selection hold under the FCA's current supervisory approach?”",
        depth: "Standard",
      },
      {
        name: "The Equity Research Review",
        persona: "Head of Research · Asset Management Firm · Pre-publication Report Review",
        question:
          "“Does the investment thesis in this initiating coverage report hold under stress-testing, and what will a short-seller's research team find that our team hasn't addressed?”",
        depth: "Standard",
      },
      {
        name: "The Risk Model Validation",
        persona: "Chief Risk Officer · Regional Bank · Internal Model Validation Cycle",
        question:
          "“Does our retail mortgage credit risk model perform reliably under a rapid rate normalisation scenario, and what are the correlation assumptions most likely to break down?”",
        depth: "Deep",
      },
    ],
  },
  {
    slug: "media",
    name: "Media + journalism",
    desc: "Investigative reporters, science editors, and data journalists stress-testing evidence, statistical claims, and source independence before publication enters the public record.",
    cases: [
      {
        name: "The Investigative Pre-Publication Review",
        persona: "Senior Investigative Reporter · National Newspaper · Pre-publication Legal Review",
        question:
          "“Does the evidence in this investigation into a major housebuilder's planning application practices support the central claim, and what is the strongest counter-argument the subject's legal team will advance?”",
        depth: "Standard",
      },
      {
        name: "The Science Story Review",
        persona: "Science Editor · Weekly Magazine · Pre-publication Fact Check",
        question:
          "“Does our draft story on a new study linking ultra-processed food consumption to cognitive decline accurately represent what the study actually found?”",
        depth: "Standard",
      },
      {
        name: "The Data Journalism Review",
        persona: "Data Journalist · Digital Outlet · Pre-publication Analysis Review",
        question:
          "“Does our analysis showing that housing affordability has deteriorated faster in regional cities than in London hold up to scrutiny, and what is the most likely methodological challenge?”",
        depth: "Standard",
      },
    ],
  },
];

const CROSS_CASES: { title: string; desc: string; verticals: string[] }[] = [
  {
    title: "Investment thesis validation",
    desc: "Stress-testing the core assumptions behind a position before committing capital or publishing a recommendation.",
    verticals: ["VC + PE", "Financial services", "Enterprise"],
  },
  {
    title: "Pre-publication evidence review",
    desc: "Running the adversarial reader's review before research, policy papers, or journalism enters the public record.",
    verticals: ["Think tanks", "Media", "Universities"],
  },
  {
    title: "Regulatory compliance review",
    desc: "Validating a compliance position or regulatory submission against the standard the regulator's reviewer will apply.",
    verticals: ["Law firms", "Financial services", "Healthcare"],
  },
  {
    title: "Expert evidence stress-test",
    desc: "Surfacing the methodological objection an opposing expert, regulator, or ERG reviewer will raise before the hearing or submission.",
    verticals: ["Law firms", "Healthcare", "Government"],
  },
  {
    title: "Market sizing validation",
    desc: "Triangulating TAM claims and growth rate projections against independent sources before they enter an IC memo or investor presentation.",
    verticals: ["VC + PE", "Enterprise", "Research labs"],
  },
  {
    title: "Policy evidence base review",
    desc: "Evaluating whether the evidence behind a policy recommendation generalises to the target population and scale.",
    verticals: ["Policy", "Government", "Think tanks"],
  },
  {
    title: "Grant + proposal evaluation",
    desc: "Assessing whether the causal claims and evidence base in a research proposal survive independent methodological review.",
    verticals: ["Universities", "Think tanks", "Research labs"],
  },
  {
    title: "Competitive landscape assessment",
    desc: "Mapping the full competitive picture — including announced moves the internal analysis has not accounted for.",
    verticals: ["Enterprise", "VC + PE", "Research labs"],
  },
];

const DEPTH_TAG_CLASS: Record<string, string> = {
  Deep: "bg-ink-3 text-rust",
  Standard: "border border-border bg-paper-alt text-muted",
  Rapid: "border border-border bg-paper-alt text-muted",
};

export default function UseCasesIndexPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Use cases" }]} />

      {/* HERO */}
      <div className="border-b border-border">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 px-5 py-16 md:px-10 md:py-20 lg:grid-cols-[1fr_400px] lg:items-start lg:gap-20 lg:px-[72px] lg:py-24">
          <div>
            <div className={eyebrow}>Use cases</div>
            <h1 className="mb-6 font-serif text-[42px] font-normal leading-[1.12] tracking-tight text-ink sm:text-5xl lg:text-[64px]">
              Thirty-three sessions.
              <br />
              <em className="text-rust not-italic italic">Eleven verticals.</em>
            </h1>
            <p className="max-w-2xl text-lg leading-[1.8] text-body">
              Each use case illustrates a realistic Augle deliberation — the question, the
              ensemble&apos;s behaviour, the unresolved objections, and the output. Sessions span
              the full range of open research questions across three depth tiers. Personas and
              questions are hypothetical illustrations of product capability.
            </p>
          </div>
          <div className="flex flex-col gap-px overflow-hidden rounded-lg border border-border bg-border">
            <div className="flex items-baseline justify-between bg-paper px-6 py-5">
              <div className="font-serif text-4xl text-rust">33</div>
              <div className="text-right text-[13px] leading-tight text-muted">
                Hypothetical sessions
                <br />
                across eleven verticals
              </div>
            </div>
            <div className="flex items-baseline justify-between bg-paper px-6 py-5">
              <div className="font-serif text-4xl text-rust">11</div>
              <div className="text-right text-[13px] leading-tight text-muted">
                Solution verticals
                <br />
                covered
              </div>
            </div>
            <div className="flex items-baseline justify-between bg-paper px-6 py-5">
              <div className="font-serif text-4xl text-rust">3</div>
              <div className="text-right text-[13px] leading-tight text-muted">
                Depth tiers
                <br />
                Rapid · Standard · Deep
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="border-b border-border bg-paper">
        <div className="overflow-x-auto px-5 py-3.5 md:px-10 lg:px-[72px]">
          <div className="mx-auto flex w-fit items-center gap-2">
            <span className="mr-2 flex-shrink-0 whitespace-nowrap font-mono text-[10px] tracking-[0.08em] text-subtle uppercase">
              Jump to
            </span>
            {VERTICALS.map((v) => (
              <a
                key={v.slug}
                href={`#${v.slug}`}
                className="flex-shrink-0 whitespace-nowrap rounded border border-border px-3.5 py-1.5 text-xs text-muted hover:border-rust hover:text-rust"
              >
                {v.name.split(" + ")[0]}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* VERTICALS */}
      <div className="mx-auto max-w-[1280px]">
        {VERTICALS.map((v, i) => (
          <div key={v.slug} id={v.slug} className="scroll-mt-16 border-b border-border">
            <div className="flex flex-wrap items-start justify-between gap-6 px-5 pt-10 md:px-10 md:pt-14 lg:px-[72px]">
              <div>
                <div className="mb-1.5 font-mono text-[10px] tracking-[0.08em] text-rust uppercase">
                  Vertical {String(i + 1).padStart(2, "0")} of 11
                </div>
                <div className="mb-2 font-serif text-3xl text-ink">{v.name}</div>
                <p className="max-w-xl text-sm leading-relaxed text-muted">{v.desc}</p>
              </div>
              <Link
                href={`/solutions/${v.slug}`}
                className="flex-shrink-0 text-[13px] text-rust hover:underline"
              >
                View solutions page →
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-3 px-5 py-7 sm:grid-cols-2 md:px-10 lg:grid-cols-3 lg:px-[72px]">
              {v.cases.map((c, ci) => (
                <Link
                  key={c.name}
                  href={`/use-cases/${v.slug}#s${ci + 1}`}
                  className="group relative rounded-lg border border-border bg-paper p-6 transition-colors hover:border-rust hover:bg-paper-alt"
                >
                  <div className="mb-2.5 font-mono text-[10px] tracking-[0.06em] text-rust uppercase">
                    Use case {String(ci + 1).padStart(2, "0")} of 03
                  </div>
                  <div className="mb-2 font-serif text-lg text-ink">{c.name}</div>
                  <div className="mb-3.5 text-xs leading-snug text-subtle italic">{c.persona}</div>
                  <p className="mb-3.5 rounded border-l-2 border-rust bg-paper-alt px-3.5 py-3 text-[13px] leading-relaxed text-body italic">
                    {c.question}
                  </p>
                  <span
                    className={`rounded px-2 py-1 font-mono text-[10px] ${DEPTH_TAG_CLASS[c.depth]}`}
                  >
                    {c.depth}
                  </span>
                  <span className="absolute bottom-4 right-4 text-sm text-border group-hover:text-rust">
                    →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* CROSS-VERTICAL */}
      <div className="border-b border-border bg-paper py-16 md:py-20">
        <div className="mx-auto max-w-[1280px] px-5 md:px-10 lg:px-[72px]">
          <div className={eyebrow}>Cross-vertical use cases</div>
          <h2 className={`${sectionTitle} mb-3`}>
            Question types that
            <br />
            span every vertical.
          </h2>
          <p className="mb-12 max-w-2xl text-lg leading-[1.85] text-body">
            Some question types recur across multiple verticals. These cross-cutting use cases
            appear under different names in different contexts — the underlying deliberation
            pattern is the same.
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {CROSS_CASES.map((c) => (
              <div
                key={c.title}
                className="rounded-lg border border-border bg-cream p-5 transition-colors hover:border-rust hover:bg-paper-alt"
              >
                <div className="mb-1.5 text-sm font-medium text-ink">{c.title}</div>
                <p className="mb-3 text-xs leading-relaxed text-muted">{c.desc}</p>
                <div className="flex flex-wrap gap-1">
                  {c.verticals.map((vName) => (
                    <span
                      key={vName}
                      className="rounded bg-paper-alt px-1.5 py-0.5 font-mono text-[10px] text-subtle"
                    >
                      {vName}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <CtaBanner
        title={
          <>
            See the deliberation
            <br />
            behind the finding.
          </>
        }
        body="Join the waitlist and run a session on a real question before you spend anything."
      />
    </>
  );
}

import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { eyebrow } from "@/lib/styles";

export const legalH2 =
  "mt-10 mb-3.5 font-serif text-2xl font-normal text-ink first:mt-0";
export const legalP = "mb-3.5 text-[15px] leading-[1.75] text-body";
export const legalUl = "mb-3.5 ml-5 list-disc space-y-1.5";
export const legalLi = "text-[15px] leading-[1.75] text-body";
export const legalLink = "text-rust underline";

export function LegalLayout({
  crumbLabel,
  title,
  lastUpdated,
  toc,
  children,
}: {
  crumbLabel: string;
  title: string;
  lastUpdated: string;
  toc: { id: string; label: string }[];
  children: React.ReactNode;
}) {
  return (
    <>
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: crumbLabel }]} />

      <div className="border-b border-border px-5 py-16 md:px-10 md:py-20 lg:px-[72px]">
        <div className="mx-auto max-w-[760px]">
          <div className={eyebrow}>Legal</div>
          <h1 className="mb-2 font-serif text-4xl leading-[1.12] tracking-tight text-ink sm:text-5xl lg:text-[52px]">
            {title}
          </h1>
          <div className="font-mono text-xs text-muted">{lastUpdated}</div>
        </div>
      </div>

      <div className="mx-auto max-w-[760px] px-5 py-14 md:px-10 md:py-16">
        <div className="mb-2 rounded-lg border border-border bg-paper p-5">
          <div className="mb-2.5 font-mono text-[11px] tracking-[0.05em] text-muted uppercase">
            On this page
          </div>
          <ol className="list-decimal space-y-1.5 pl-[18px]">
            {toc.map((item) => (
              <li key={item.id} className="text-sm leading-relaxed text-ink">
                <Link href={`#${item.id}`} className="hover:text-rust">
                  {item.label}
                </Link>
              </li>
            ))}
          </ol>
        </div>
        {children}
      </div>
    </>
  );
}

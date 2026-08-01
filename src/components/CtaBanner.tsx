import Link from "next/link";
import { btnGhost, btnWhite } from "@/lib/styles";

export function CtaBanner({
  title,
  body,
  primaryLabel = "Join waitlist",
  primaryHref = "/waitlist",
  secondaryLabel = "How it works",
  secondaryHref = "/how-it-works",
}: {
  title: React.ReactNode;
  body: React.ReactNode;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <div className="bg-rust px-5 py-16 text-center md:px-10 md:py-24 lg:px-[72px]">
      <h2 className="mx-auto mb-5 max-w-2xl font-serif text-[32px] leading-[1.1] tracking-tight text-offwhite md:text-[52px]">
        {title}
      </h2>
      <p className="mx-auto mb-10 max-w-xl text-base leading-relaxed text-offwhite/75 md:text-lg">
        {body}
      </p>
      <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
        <Link href={primaryHref} className={btnWhite}>
          {primaryLabel}
        </Link>
        <Link href={secondaryHref} className={btnGhost}>
          {secondaryLabel}
        </Link>
      </div>
    </div>
  );
}

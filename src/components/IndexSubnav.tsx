import Link from "next/link";

const LINKS = [
  { key: "overview", label: "Overview", href: "/index" },
  { key: "explorer", label: "Question explorer", href: "/index/explorer" },
  { key: "heatmap", label: "Heatmaps", href: "/index/heatmap" },
  { key: "methodology", label: "Methodology", href: "/index/methodology" },
] as const;

type ActiveKey = (typeof LINKS)[number]["key"];

export function IndexSubnav({
  active,
  variant = "light",
}: {
  active: ActiveKey;
  variant?: "dark" | "light";
}) {
  const isDark = variant === "dark";
  return (
    <div className={isDark ? "border-b border-border-dark bg-ink" : "border-b border-border bg-paper-alt"}>
      <div className="mx-auto flex h-10 max-w-[1280px] items-stretch overflow-x-auto px-5 md:h-12 md:px-10 lg:px-[72px]">

        {LINKS.map((link) => {
          const isActive = link.key === active;
          return (
            <Link
              key={link.key}
              href={link.href}
              className={`flex flex-shrink-0 items-center whitespace-nowrap border-r px-4 font-mono text-[12px] transition-colors md:text-[13px] ${
                isDark ? "border-border-dark" : "border-border"
              } ${
                isActive
                  ? "border-b-2 border-b-rust text-rust"
                  : isDark
                    ? "text-faint hover:text-offwhite"
                    : "text-muted hover:text-ink"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

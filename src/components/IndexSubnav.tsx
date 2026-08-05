import Link from "next/link";

const LINKS = [
  { key: "overview", label: "Overview", href: "/deliberation-index" },
  { key: "explorer", label: "Question explorer", href: "/deliberation-index/explorer" },
  { key: "heatmap", label: "Heatmaps", href: "/deliberation-index/heatmap" },
  // { key: "methodology", label: "Methodology", href: "/deliberation-index/methodology" },
] as const;

type ActiveKey = (typeof LINKS)[number]["key"];

export function IndexSubnav({
  active,
  variant = "light",
  fullWidth = false,
}: {
  active: ActiveKey;
  variant?: "dark" | "light";
  fullWidth?: boolean;
}) {
  const isDark = variant === "dark";
  return (
    <div className={`flex-shrink-0 ${isDark ? "border-b border-border-dark bg-ink" : "border-b border-border bg-paper-alt"}`}>
      <div
        className={`flex h-10 items-stretch overflow-x-auto px-5 md:px-10 lg:px-[72px] ${
          fullWidth ? "" : "mx-auto max-w-[1280px]"
        }`}
      >

        {LINKS.map((link) => {
          const isActive = link.key === active;
          return (
            <Link
              key={link.key}
              href={link.href}
              className={`flex flex-shrink-0 items-center whitespace-nowrap border-r px-4 text-[12px] transition-colors ${
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

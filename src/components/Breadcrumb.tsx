import Link from "next/link";

export function Breadcrumb({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <div className="border-b border-border bg-paper">
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-center gap-1.5 px-5 py-3.5 font-mono text-xs text-subtle md:px-10 lg:px-[72px]">
        {items.map((item, i) => (
          <span key={item.label} className="flex items-center gap-1.5">
            {i > 0 && <span>›</span>}
            {item.href ? (
              <Link href={item.href} className="hover:text-ink">
                {item.label}
              </Link>
            ) : (
              <span className="text-rust">{item.label}</span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

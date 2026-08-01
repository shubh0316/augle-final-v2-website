export const GRADES = ["Established", "Probable", "Contested", "Gap"] as const;
export type Grade = (typeof GRADES)[number];

// Shared confidence-grade badge (pill) classes — identical across the
// explorer and heatmap source files' GRADE_STYLES / GRADE_CHIP_STYLES maps.
export const GRADE_BADGE_CLASS: Record<Grade, string> = {
  Established: "bg-[#D9F0E4] text-[#2A7050]",
  Probable: "bg-[#D4E4F5] text-[#2A4A7A]",
  Contested: "bg-[#F5E8C8] text-[#8A5A1A]",
  Gap: "bg-[#F5D8D8] text-[#8A1818]",
};

// Dot colors used in the explorer's grade filter chips.
export const GRADE_DOT_CLASS: Record<Grade, string> = {
  Established: "bg-[#3AAA72]",
  Probable: "bg-[#6A9AAA]",
  Contested: "bg-[#C79233]",
  Gap: "bg-[#C15F3C]",
};

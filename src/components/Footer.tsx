import Link from "next/link";
import { Logo } from "./Logo";

const SOCIALS = [
  {
    href: "https://x.com/augleinc",
    label: "X",
    icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiByeD0iMyIgZmlsbD0iI0MxNUYzQyIvPgo8cGF0aCBkPSJNMjcuOTAxOSAyMi41ODIzTDM4LjE4MSAxMUgzNS43NTM3TDI3LjAyMjggMjAuOTU4NkwyMC4wNTAzIDExSDEyLjAxMzZMMjIuNzgzMSAyNi40NjM1TDEyLjAxMzYgMzguNUgxNC40NDFMMjMuNjcyMyAyNy45ODY2TDMxLjAzOTQgMzguNUgzOS4wNzYxTDI3LjkwMTMgMjIuNTgyM0gyNy45MDE5Wk0yNC42MzIzIDI2LjU5NjNMMjMuNTU5NiAyNS4wODc5TDE1LjA1MDEgMTMuMDM5N0gxOC41MjMzTDI1LjM3NDEgMjIuNzAzM0wyNi40NDY4IDI0LjIxMTdMMzUuNzU0OSAzNy40OTA5SDMyLjI4MTdMMjQuNjMyMyAyNi41OTY5VjI2LjU5NjNaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K",
  },
  {
    href: "https://www.facebook.com/augleinc/",
    label: "Facebook",
    icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiByeD0iMyIgZmlsbD0iI0MxNUYzQyIvPgo8cGF0aCB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNS42MjUgMTApIHNjYWxlKDAuMDU4NTkzNzUpIiBkPSJNODAgMjk5LjNWNTEySDE5NlYyOTkuM2g4Ni41bDE4LTk3LjhIMTk2VjE2Ni45YzAtNTEuNyAyMC4zLTcxLjUgNzIuNy03MS41YzE2LjMgMCAyOS40IC40IDM3IDEuMlY3LjlDMjkxLjQgNCAyNTYuNCAwIDIzNi4yIDBDMTI5LjMgMCA4MCA1MC41IDgwIDE1OS40djQyLjFIMTR2OTcuOEg4MHoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=",
  },
  {
    href: "https://linkedin.com/company/augle",
    label: "LinkedIn",
    icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiByeD0iMyIgZmlsbD0iI0MxNUYzQyIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTE3LjIwMDUgMTguODQ3N0gxMC40MDE5VjM5LjI3NDhIMTcuMjAwNVYxOC44NDc3WiIgZmlsbD0iI0RBREFEQSIvPgo8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTE3LjY0ODUgMTIuNTI4NEMxNy42MDQzIDEwLjUyNTUgMTYuMTcyMSA5IDEzLjg0NjMgOUMxMS41MjA1IDkgMTAgMTAuNTI1NSAxMCAxMi41Mjg0QzEwIDE0LjQ4OTggMTEuNDc1NiAxNi4wNTkyIDEzLjc1OCAxNi4wNTkySDEzLjgwMTVDMTYuMTcyMSAxNi4wNTkyIDE3LjY0ODUgMTQuNDg5OCAxNy42NDg1IDEyLjUyODRaIiBmaWxsPSIjREFEQURBIi8+CjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNDEuNzE5MiAyNy41NjE3QzQxLjcxOTIgMjEuMjg3NCAzOC4zNjUyIDE4LjM2NzIgMzMuODkxNCAxOC4zNjcyQzMwLjI4MTggMTguMzY3MiAyOC42NjU3IDIwLjM0OTkgMjcuNzYzMyAyMS43NDA3VjE4Ljg0NzRIMjAuOTYzOUMyMS4wNTM1IDIwLjc2NDIgMjAuOTYzOSAzOS4yNzQ1IDIwLjk2MzkgMzkuMjc0NUgyNy43NjMzVjI3Ljg2NjNDMjcuNzYzMyAyNy4yNTU4IDI3LjgwNzUgMjYuNjQ2OCAyNy45ODcyIDI2LjIwOTdDMjguNDc4NiAyNC45OTAxIDI5LjU5NzMgMjMuNzI3MyAzMS40NzU2IDIzLjcyNzNDMzMuOTM2OCAyMy43MjczIDM0LjkyMDYgMjUuNjAwNSAzNC45MjA2IDI4LjM0NTVWMzkuMjc0SDQxLjcxOUw0MS43MTkyIDI3LjU2MTdaIiBmaWxsPSIjREFEQURBIi8+Cjwvc3ZnPgo=",
  },
  {
    href: "https://augle.medium.com",
    label: "Medium",
    icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiByeD0iMyIgZmlsbD0iI0MxNUYzQyIvPgo8cGF0aCBkPSJNNDkuODIwMiAzMy43ODAxVjM4LjMyMTFDNDkuNTM1MSAzOC4zNDg3IDQ5LjI0MjEgMzguMzYyNyA0OC45NDEzIDM4LjM2MjdDNDMuNTczMiAzOC4zNjI3IDQwLjU1MSAzMy44OTE1IDQwLjQyMDcgMjguMjk2NUM0MC40MTY4IDI4LjA4MDIgNDAuNDE4MyAyNy44NjUzIDQwLjQyMzEgMjcuNjUxOEM0MC40MjYgMjcuNTE4NyA0MC40MzEzIDI3LjM4NTkgNDAuNDM4IDI3LjI1MzdDNDAuNDQxNCAyNy4xODMxIDQwLjQ0NDcgMjcuMTE2NyA0MC40NSAyNy4wNDI3QzQwLjQ1NTMgMjYuOTY4NiA0MC40NjA2IDI2Ljg5NDYgNDAuNDY2OSAyNi44MjA2QzQwLjY2MDEgMjQuMzUwMyA0MS40NTUzIDIyLjE1MjEgNDIuNzY3OSAyMC41MjU2QzQzLjU4MzMgMTkuNTE2IDQ0LjU2MzEgMTguNzQ2NyA0NS42NzQyIDE4LjIzMjNDNDYuNjUwMiAxNy43NDA5IDQ4LjAyMTkgMTcuNDY5NyA0OS4xNCAxNy40Njk3SDQ5LjE4ODRDNDkuNDAwMyAxNy40Njk3IDQ5LjYxMDcgMTcuNDc2OCA0OS44MjAyIDE3LjQ5MDhWMTguNzQwMUM0OS41OTgxIDE4LjY3OTIgNDkuMzYwMyAxOC42NDY2IDQ5LjEwNzMgMTguNjQyNEM0Ni44NDU5IDE4LjY4OSA0NS40OTgyIDIxLjM5NzggNDUuMzMwNCAyNS4xNTA4SDQ5LjgyMDJWMjYuMjA4NUg0NS4yMjlMNDUuMjI3NSAyNi4yMDk1QzQ1LjAyMDYgMjkuODY2MiA0Ny4wMjIgMzIuOTU2NiA0OS44MjAyIDMzLjc4MDFaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNNDAuNjQ2MiAxMS4zMTRMNDAuNjg1NyAxMS4zMDUzVjExSDMyLjYzMzVMMjUuMTU2OCAyOC41NzI3TDE3LjY4MDEgMTFIOS4wMDI4OFYxMS4zMDUzTDkuMDQxODUgMTEuMzE0QzEwLjUxMTYgMTEuNjQ1NyAxMS4yNTc4IDEyLjE0MDQgMTEuMjU3OCAxMy45MjQ2VjM0LjgxMjRDMTEuMjU3OCAzNi41OTY1IDEwLjUwODcgMzcuMDkxMyA5LjAzODk3IDM3LjQyM0w5IDM3LjQzMTdWMzcuNzM3OUgxNC44ODcyVjM3LjQzMjZMMTQuODQ4MyAzNy40MjRDMTMuMzc4NSAzNy4wOTIyIDEyLjYzMjMgMzYuNTk3NSAxMi42MzIzIDM0LjgxMzNWMTUuMTM2MkwyMi4yMzcgMzcuNzM3OUgyMi43ODE3TDMyLjY2NjIgMTQuNTA1OVYzNS4zMjkyQzMyLjU0MDIgMzYuNzM4NCAzMS44MDA4IDM3LjE3MzUgMzAuNDcgMzcuNDc0TDMwLjQzMDUgMzcuNDgzMVYzNy43ODZINDAuNjg1N1YzNy40ODMxTDQwLjY0NjIgMzcuNDc0QzM5LjMxNCAzNy4xNzM1IDM4LjU1NjcgMzYuNzM4NCAzOC40MzA4IDM1LjMyOTJMMzguNDI0MSAxMy45MjQ2SDM4LjQzMDhDMzguNDMwOCAxMi4xNDA0IDM5LjE3NyAxMS42NDU3IDQwLjY0NjIgMTEuMzE0WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg==",
  },
  {
    href: "https://augle.substack.com",
    label: "Substack",
    icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiByeD0iMyIgZmlsbD0iI0MxNUYzQyIvPgo8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMS4xMyw5LjQ2KSBzY2FsZSgwLjM3KSI+CjxyZWN0IHg9IjIiIHk9IjEiIHdpZHRoPSI3MSIgaGVpZ2h0PSIxMCIgZmlsbD0id2hpdGUiLz4KPHJlY3QgeD0iMiIgeT0iMjAiIHdpZHRoPSI3MSIgaGVpZ2h0PSI5IiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMiwzOCBMNzMsMzggTDczLDgzIEwzNy41LDYyLjUgTDIsODMgWiIgZmlsbD0id2hpdGUiLz4KPC9nPgo8L3N2Zz4K",
  },
];

const COLUMNS = [
  {
    label: "Product",
    links: [
      { href: "/how-it-works", label: "How it works" },
      { href: "/how-it-works/agents", label: "Agents + roles" },
      { href: "/how-it-works/guardian", label: "Guardian system" },
      { href: "/how-it-works/phases", label: "Phase architecture" },
      { href: "/how-it-works/scoring", label: "Confidence + dissent scoring" },
      { href: "/outcomes", label: "Outcomes" },
      { href: "/pricing", label: "Pricing" },
    ],
  },
  {
    label: "Solutions",
    links: [
      { href: "/solutions/universities", label: "Universities" },
      { href: "/solutions/research-labs", label: "Research labs" },
      { href: "/solutions/financial-services", label: "Financial services" },
      { href: "/solutions/law-firms", label: "Law firms" },
      { href: "/solutions/venture-capital", label: "Venture capital" },
      { href: "/solutions/healthcare", label: "Healthcare" },
      { href: "/solutions", label: "All solutions →" },
    ],
  },
  {
    label: "Resources",
    links: [
      { href: "/blog", label: "Blog" },
      { href: "/use-cases", label: "Use cases" },
      { href: "/glossary", label: "Glossary" },
      { href: "/deliberation-index", label: "Deliberation index" },
      { href: "/outcomes", label: "Deliberation sessions" },
      { href: "/investor-access", label: "Corpus training" },
      { href: "/research", label: "Research papers" },
    ],
  },
  {
    label: "Company",
    links: [
      { href: "/about", label: "About Augle" },
      { href: "/press", label: "Press" },
      { href: "/careers", label: "Careers" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-ink px-5 pt-16 pb-11 md:px-10 lg:px-[72px]">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-13 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[260px_repeat(4,1fr)]">
          <div className="min-w-0">
            <Logo variant="light" className="h-8 w-auto" />
            <p className="mt-2 text-sm leading-relaxed text-faint">
              Augmented deliberation.
              <br />
              Engineered for the questions that matter.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.label} className="min-w-0">
              <div className="mb-4 font-mono text-[10px] tracking-[0.08em] text-faint uppercase">
                {col.label}
              </div>
              <div className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-subtle transition-colors hover:text-offwhite"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              {col.label === "Company" && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {SOCIALS.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener"
                      className="block h-7 w-7 overflow-hidden rounded-md"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={social.icon} alt={social.label} className="h-full w-full" />
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-4 border-t border-border-dark pt-7 sm:flex-row sm:justify-between">
          <span className="text-[13px] text-faint">© 2026 Augle, Inc. All rights reserved.</span>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-[13px] text-faint hover:text-offwhite">
              Privacy
            </Link>
            <Link href="/terms" className="text-[13px] text-faint hover:text-offwhite">
              Terms
            </Link>
            <Link href="/security" className="text-[13px] text-faint hover:text-offwhite">
              Security
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { mediumArticles, mediumWordmark, continueReadingIcon } from "@/data/mediumArticles";

export function MediumArticleGrid() {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={mediumWordmark} alt="Medium" className="mb-4 block h-4 w-auto" />
      <div className="mb-8 font-serif text-2xl font-normal text-ink">augle.medium.com</div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {mediumArticles.map((article) => {
          const cardClass =
            "flex flex-col overflow-hidden rounded-lg border border-border bg-ink";
          const inner = (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={article.img}
                alt={article.alt}
                className="block aspect-[1600/840] w-full object-cover"
              />
              <div className="relative flex flex-1 flex-col p-6 pt-6 pb-5.5">
                <p className="mb-4.5 line-clamp-4 text-[15px] leading-[1.7] text-offwhite/90">
                  {article.excerpt}
                </p>
                <div className="mt-auto flex items-center gap-2.5">
                  {article.url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={continueReadingIcon}
                      alt="Continue reading on Medium"
                      className="block h-[22px] w-auto"
                    />
                  ) : (
                    <span className="rounded border border-border-dark px-2 py-1 font-mono text-[10px] font-medium tracking-[0.08em] text-faint uppercase">
                      Coming soon
                    </span>
                  )}
                </div>
              </div>
            </>
          );

          return article.url ? (
            <a
              key={article.alt}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className={cardClass}
            >
              {inner}
            </a>
          ) : (
            <div key={article.alt} className={cardClass}>
              {inner}
            </div>
          );
        })}
      </div>
    </>
  );
}

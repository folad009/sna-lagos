import { useEffect } from "react";
import { X, Clock, CalendarDays, UserRound } from "lucide-react";
import { NewsArticle } from "../../types";

const formatDate = (iso: string): string => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-NG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const ArticleModal = ({
  article,
  onClose,
}: {
  article: NewsArticle;
  onClose: () => void;
}) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[120] flex justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-6 animate-in fade-in duration-300"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={article.title}
    >
      <article
        className="relative w-full max-w-3xl overflow-y-auto bg-white shadow-2xl sm:rounded-[2.5rem] animate-in slide-in-from-bottom-4 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-md backdrop-blur transition hover:bg-white"
          aria-label="Close article"
        >
          <X size={22} />
        </button>

        <div className="relative h-64 w-full overflow-hidden sm:h-80">
          <img
            src={article.image}
            alt={article.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <span className="absolute bottom-5 left-6 rounded-full bg-[#bb6e31] px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white">
            {article.category}
          </span>
        </div>

        <div className="px-6 py-8 sm:px-12 sm:py-10">
          <h1 className="font-serif text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
            {article.title}
          </h1>

          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-gray-100 pb-6 text-sm text-gray-500">
            <span className="flex items-center gap-2">
              <UserRound size={16} className="text-[#bb6e31]" />
              {article.author}
            </span>
            <span className="flex items-center gap-2">
              <CalendarDays size={16} className="text-[#bb6e31]" />
              {formatDate(article.date)}
            </span>
            {article.readingTime ? (
              <span className="flex items-center gap-2">
                <Clock size={16} className="text-[#bb6e31]" />
                {article.readingTime} min read
              </span>
            ) : null}
          </div>

          <div
            className="article-body mt-8 space-y-5 text-lg leading-relaxed text-gray-700 [&_a]:text-[#bb6e31] [&_a]:underline [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 [&_img]:rounded-2xl [&_strong]:text-gray-900"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>
      </article>
    </div>
  );
};

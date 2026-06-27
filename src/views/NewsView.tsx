import { useEffect, useMemo, useRef, useState } from "react";
import { Newspaper, RefreshCw, ArrowRight, Clock, CalendarDays } from "lucide-react";
import { SectionHeading } from "../components/ui/SectionHeading";
import { ArticleModal } from "../components/modals/ArticleModal";
import { getNews } from "../api/wordpress";
import { NewsArticle } from "../types";
import { useMetaTags } from "../hooks/useMetaTags";

const formatDate = (iso: string): string => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-NG", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const NewsView = () => {
  useMetaTags(
    "News & Stories | SNA Lagos",
    "The latest announcements, exhibitions, and stories from the Society of Nigerian Artists, Lagos Chapter."
  );

  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selected, setSelected] = useState<NewsArticle | null>(null);
  const fetchedRef = useRef(false);

  const load = async () => {
    try {
      setLoading(true);
      setError(false);
      const data = await getNews();
      setArticles(data);
    } catch (e) {
      console.error("Failed to load news", e);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (fetchedRef.current) return;
    fetchedRef.current = true;
    load();
  }, []);

  const categories = useMemo(() => {
    const unique = Array.from(
      new Set(articles.map((a) => a.category).filter(Boolean))
    );
    return ["All", ...unique];
  }, [articles]);

  const featured = articles[0];

  const filtered = useMemo(() => {
    const rest = articles.slice(1);
    if (activeCategory === "All") return rest;
    return rest.filter((a) => a.category === activeCategory);
  }, [articles, activeCategory]);

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="From the Chapter"
          title="News & Stories"
          subtitle="Announcements, exhibition recaps, and dispatches from the studios of our members."
        />

        {/* Loading skeleton */}
        {loading && (
          <div className="space-y-12">
            <div className="h-80 w-full animate-pulse rounded-[2.5rem] bg-gray-100" />
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-80 animate-pulse rounded-[2rem] bg-gray-100"
                />
              ))}
            </div>
          </div>
        )}

        {/* Error state */}
        {!loading && error && (
          <div className="text-center py-24">
            <p className="text-red-500 font-semibold mb-4">
              Unable to load news. Please try again.
            </p>
            <button
              onClick={load}
              className="inline-flex items-center gap-2 rounded-xl bg-[#bb6e31] px-5 py-3 font-bold text-white transition hover:bg-[#a55f29]"
            >
              <RefreshCw size={18} />
              Retry
            </button>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && articles.length === 0 && (
          <div className="text-center py-24 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
            <Newspaper className="mx-auto text-gray-200 mb-6" size={72} />
            <h3 className="text-2xl font-bold text-gray-400 font-serif">
              No stories published yet.
            </h3>
          </div>
        )}

        {!loading && !error && featured && (
          <>
            {/* Featured article */}
            <button
              onClick={() => setSelected(featured)}
              className="group mb-16 grid w-full overflow-hidden rounded-[2.5rem] border border-gray-100 bg-white text-left shadow-sm transition-shadow duration-300 hover:shadow-2xl lg:grid-cols-2"
            >
              <div className="relative h-64 overflow-hidden lg:h-auto">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute top-6 left-6 rounded-full bg-[#bb6e31] px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white">
                  Featured
                </span>
              </div>
              <div className="flex flex-col justify-center p-8 sm:p-12">
                <div className="mb-4 flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-gray-400">
                  <span className="text-[#bb6e31]">{featured.category}</span>
                  <span className="flex items-center gap-1.5">
                    <CalendarDays size={14} />
                    {formatDate(featured.date)}
                  </span>
                </div>
                <h3 className="mb-4 font-serif text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
                  {featured.title}
                </h3>
                <p className="mb-6 text-lg leading-relaxed text-gray-500">
                  {featured.excerpt}
                </p>
                <span className="flex items-center font-bold text-[#bb6e31]">
                  Read story
                  <ArrowRight
                    size={18}
                    className="ml-2 transition-transform group-hover:translate-x-1"
                  />
                </span>
              </div>
            </button>

            {/* Category filter */}
            {categories.length > 1 && (
              <div className="mb-12 flex flex-wrap gap-3">
                {categories.map((cat) => {
                  const active = cat === activeCategory;
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`rounded-full px-5 py-2.5 text-sm font-bold transition ${
                        active
                          ? "bg-[#bb6e31] text-white shadow-md"
                          : "border border-gray-200 bg-white text-gray-600 hover:border-[#bb6e31] hover:text-[#bb6e31]"
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Article grid */}
            {filtered.length > 0 ? (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filtered.map((article) => (
                  <button
                    key={article.id}
                    onClick={() => setSelected(article)}
                    className="group flex flex-col overflow-hidden rounded-[2rem] border border-gray-100 bg-white text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <span className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#bb6e31] backdrop-blur">
                        {article.category}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-7">
                      <div className="mb-3 flex items-center gap-4 text-[11px] font-bold uppercase tracking-widest text-gray-400">
                        <span className="flex items-center gap-1.5">
                          <CalendarDays size={13} />
                          {formatDate(article.date)}
                        </span>
                        {article.readingTime ? (
                          <span className="flex items-center gap-1.5">
                            <Clock size={13} />
                            {article.readingTime} min
                          </span>
                        ) : null}
                      </div>
                      <h4 className="mb-3 font-serif text-xl font-bold leading-snug text-gray-900 transition-colors group-hover:text-[#bb6e31]">
                        {article.title}
                      </h4>
                      <p className="mb-5 line-clamp-3 text-sm leading-relaxed text-gray-500">
                        {article.excerpt}
                      </p>
                      <span className="mt-auto flex items-center text-sm font-bold text-[#bb6e31]">
                        Read more
                        <ArrowRight
                          size={16}
                          className="ml-1.5 transition-transform group-hover:translate-x-1"
                        />
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <p className="py-16 text-center font-semibold text-gray-400">
                No stories in this category yet.
              </p>
            )}
          </>
        )}
      </div>

      {selected && (
        <ArticleModal article={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
};

export default NewsView;

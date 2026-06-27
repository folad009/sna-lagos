import { useEffect, useMemo, useRef, useState } from "react";
import { Image as ImageIcon, RefreshCw } from "lucide-react";
import { SectionHeading } from "../components/ui/SectionHeading";
import { Lightbox } from "../components/modals/Lightbox";
import { getGalleryItems } from "../api/wordpress";
import { GalleryItem } from "../types";
import { useMetaTags } from "../hooks/useMetaTags";

const GalleryView = () => {
  useMetaTags(
    "Gallery | SNA Lagos",
    "Explore a curated collection of works by members of the Society of Nigerian Artists, Lagos Chapter."
  );

  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const fetchedRef = useRef(false);

  const load = async () => {
    try {
      setLoading(true);
      setError(false);
      const data = await getGalleryItems();
      setItems(data);
    } catch (e) {
      console.error("Failed to load gallery", e);
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
    const unique = Array.from(new Set(items.map((i) => i.category).filter(Boolean)));
    return ["All", ...unique];
  }, [items]);

  const filtered = useMemo(() => {
    if (activeCategory === "All") return items;
    return items.filter((i) => i.category === activeCategory);
  }, [items, activeCategory]);

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Member Works"
          title="The Gallery"
          subtitle="A living collection of works by our members — from indigenous craft to contemporary experiment. Click any piece to view it up close."
        />

        {/* Category Filter */}
        {!loading && !error && items.length > 0 && (
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

        {/* Loading skeleton */}
        {loading && (
          <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="mb-6 break-inside-avoid rounded-2xl bg-gray-100 animate-pulse"
                style={{ height: `${220 + (i % 3) * 90}px` }}
              />
            ))}
          </div>
        )}

        {/* Error state */}
        {!loading && error && (
          <div className="text-center py-24">
            <p className="text-red-500 font-semibold mb-4">
              Unable to load the gallery. Please try again.
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
        {!loading && !error && filtered.length === 0 && (
          <div className="text-center py-24 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
            <ImageIcon className="mx-auto text-gray-200 mb-6" size={72} />
            <h3 className="text-2xl font-bold text-gray-400 font-serif">
              No artworks to show yet.
            </h3>
          </div>
        )}

        {/* Masonry grid */}
        {!loading && !error && filtered.length > 0 && (
          <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6">
            {filtered.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setLightboxIndex(idx)}
                className="group relative block w-full break-inside-avoid overflow-hidden rounded-2xl bg-gray-100 text-left shadow-sm transition-shadow duration-300 hover:shadow-2xl"
              >
                <img
                  src={item.thumbnail || item.image}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={item.ratio ? { aspectRatio: String(item.ratio) } : undefined}
                />
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/10 to-transparent p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="mb-2 w-fit rounded-full bg-white/20 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-sm">
                    {item.category}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-white">
                    {item.title}
                  </h3>
                  {item.artist && (
                    <p className="text-sm text-white/70">{item.artist}</p>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          items={filtered}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </div>
  );
};

export default GalleryView;

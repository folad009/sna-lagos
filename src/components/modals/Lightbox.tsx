import { useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { GalleryItem } from "../../types";

interface LightboxProps {
  items: GalleryItem[];
  index: number;
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
}

export const Lightbox = ({ items, index, onClose, onNavigate }: LightboxProps) => {
  const item = items[index];

  const goPrev = useCallback(() => {
    onNavigate((index - 1 + items.length) % items.length);
  }, [index, items.length, onNavigate]);

  const goNext = useCallback(() => {
    onNavigate((index + 1) % items.length);
  }, [index, items.length, onNavigate]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [goPrev, goNext, onClose]);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-300"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 text-white/70 hover:text-white transition p-2"
        aria-label="Close"
      >
        <X size={32} />
      </button>

      {items.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition active:scale-95"
            aria-label="Previous artwork"
          >
            <ChevronLeft size={28} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition active:scale-95"
            aria-label="Next artwork"
          >
            <ChevronRight size={28} />
          </button>
        </>
      )}

      <figure
        className="flex max-h-[90vh] w-full max-w-5xl flex-col items-center animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={item.image}
          alt={item.title}
          className="max-h-[75vh] w-auto max-w-full rounded-lg object-contain shadow-2xl"
        />
        <figcaption className="mt-6 text-center text-white">
          <h3 className="font-serif text-2xl font-bold">{item.title}</h3>
          <p className="mt-1 text-sm text-white/70">
            {[item.artist, item.medium, item.year].filter(Boolean).join("  ·  ")}
          </p>
          <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
            {index + 1} / {items.length}
          </p>
        </figcaption>
      </figure>
    </div>
  );
};

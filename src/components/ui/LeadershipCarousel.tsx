import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Leader } from "../../types";
import { LeaderCard } from "./LeaderCard";

export const LeadershipCarousel = ({ leaders }: { leaders: Leader[] }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateScrollState = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const { scrollLeft, scrollWidth, clientWidth } = track;
    setCanScrollPrev(scrollLeft > 8);
    setCanScrollNext(scrollLeft < scrollWidth - clientWidth - 8);
  }, []);

  useEffect(() => {
    updateScrollState();
    const track = trackRef.current;
    if (!track) return;

    track.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      track.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState, leaders.length]);

  const scrollByCards = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const firstCard = track.querySelector<HTMLElement>("[data-carousel-item]");
    const gap = 40;
    const step = firstCard ? firstCard.offsetWidth + gap : track.clientWidth * 0.8;
    track.scrollBy({ left: step * direction, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div className="mb-6 flex justify-end gap-3">
        <button
          type="button"
          aria-label="Previous"
          onClick={() => scrollByCards(-1)}
          disabled={!canScrollPrev}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm transition hover:border-[#bb6e31] hover:text-[#bb6e31] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-gray-200 disabled:hover:text-gray-700"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          type="button"
          aria-label="Next"
          onClick={() => scrollByCards(1)}
          disabled={!canScrollNext}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm transition hover:border-[#bb6e31] hover:text-[#bb6e31] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-gray-200 disabled:hover:text-gray-700"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div
        ref={trackRef}
        className="-mx-4 flex snap-x snap-mandatory gap-10 overflow-x-auto scroll-smooth px-4 pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {leaders.map((leader) => (
          <div
            key={leader.id}
            data-carousel-item
            className="w-[75%] flex-none snap-start sm:w-[calc((100%-2.5rem)/2)] lg:w-[calc((100%-7.5rem)/4)]"
          >
            <LeaderCard leader={leader} />
          </div>
        ))}
      </div>
    </div>
  );
};

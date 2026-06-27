import { useState } from "react";
import { Leader } from "../../types";

const initialsFromName = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

export const LeaderCard = ({ leader }: { leader: Leader }) => {
  const [imageFailed, setImageFailed] = useState(false);
  const showPhoto = Boolean(leader.image) && !imageFailed;

  return (
    <article className="group">
      <div className="relative mb-8">
        <div className="aspect-[3/4] overflow-hidden rounded-sm bg-gray-100 shadow-xl border border-gray-100">
          {showPhoto ? (
            <img
              src={leader.image}
              alt={leader.name}
              loading="lazy"
              decoding="async"
              onError={() => setImageFailed(true)}
              className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div
              className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-500/15 via-white to-brand-50"
              aria-hidden
            >
              <span className="text-5xl font-bold font-serif text-[#bb6e31]/75">
                {initialsFromName(leader.name)}
              </span>
            </div>
          )}
          {leader.bio && showPhoto && (
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-[#bb6e31]/90 via-[#bb6e31]/40 to-transparent p-8 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <p className="text-sm italic leading-relaxed text-white">
                {leader.bio}
              </p>
            </div>
          )}
        </div>
      </div>

      <h4 className="mb-1 font-serif text-2xl font-bold text-gray-900">
        {leader.name}
      </h4>

      {leader.role ? (
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#bb6e31]">
          {leader.role}
        </p>
      ) : null}

      {leader.tenure ? (
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
          {leader.tenure}
        </p>
      ) : null}
    </article>
  );
};

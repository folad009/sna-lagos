import { Award } from "lucide-react";

export const Hero = ({ onExplore }: any) => {
  return (
    <div className="relative pt-32 pb-16 md:pt-52 md:pb-24 overflow-hidden">
      <div className="absolute top-0 right-0 -z-10 w-full h-full md:w-1/2 opacity-20">
        <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=1200&fit=crop')] bg-cover opacity-30"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl">
          <div className="inline-flex items-center space-x-2 bg-emerald-50 text-emerald-800 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-8 border border-emerald-100">
            <Award size={14} />
            <span>Established 1963</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-bold leading-tight mb-8 font-serif">
            Where Nigerian{" "}
            <span className="italic text-emerald-800">Mastery</span> Meets
            Tomorrow.
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed max-w-2xl">
            SNA Lagos Chapter is the definitive professional body for visual
            artists, uniting over 500 creators across the Heart of Africa.
          </p>
          <div className="flex flex-wrap gap-6 mb-20">
            <button
              onClick={onExplore}
              className="bg-emerald-800 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-emerald-900 shadow-2xl transition transform hover:-translate-y-1 active:scale-95"
            >
              Explore Directory
            </button>
            <button className="border-2 border-emerald-800 text-emerald-800 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-emerald-50 transition transform hover:-translate-y-1 active:scale-95">
              Membership Portal
            </button>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 border-t border-gray-100 pt-12">
            <div>
              <p className="text-4xl font-bold text-emerald-950 font-serif mb-1">
                500+
              </p>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                Professional Members
              </p>
            </div>
            <div>
              <p className="text-4xl font-bold text-emerald-950 font-serif mb-1">
                60+
              </p>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                Years of Heritage
              </p>
            </div>
            <div>
              <p className="text-4xl font-bold text-emerald-950 font-serif mb-1">
                12
              </p>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                Annual Exhibitions
              </p>
            </div>
            <div>
              <p className="text-4xl font-bold text-emerald-950 font-serif mb-1">
                24/7
              </p>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                Art Advocacy
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

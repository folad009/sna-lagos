import { Award, Eye } from "lucide-react";

const MissionVision = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-[#bb6e31] text-white p-12 rounded-[3rem] relative overflow-hidden shadow-2xl group">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-white/5 rounded-full blur-2xl group-hover:scale-110 transition-transform"></div>
            <h3 className="text-3xl font-bold mb-4 font-serif">Our Mission</h3>
            <p className="text-white leading-relaxed font-medium">
              The Society of Nigerian Artists (SNA) encourages the development
              of visual arts in Nigeria and fosters their understanding through
              dedicated practice and scholarly engagement.
            </p>
          </div>
          <div className="bg-[#bb6e31]/10 text-[#bb6e31] p-12 rounded-[3rem] relative overflow-hidden shadow-lg border border-[#bb6e31]/20 group">
            <h3 className="text-3xl font-bold mb-4 font-serif">Our Vision</h3>
            <p className="text-[#bb6e31]/80 leading-relaxed font-medium">
              The Society of Nigerian Artists (SNA) engenders the highest
              standard of scholarship, creativity, criticism and teaching visual
              arts in Nigeria to encourage intellectual advancement and the
              development of skills that enrich visual arts professionals and
              their contributions to national development.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;

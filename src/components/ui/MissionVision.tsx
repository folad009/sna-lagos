import { Award, Eye } from "lucide-react";

const MissionVision = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-[#bb6e31] text-white p-12 rounded-[3rem] relative overflow-hidden shadow-2xl group">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-white/5 rounded-full blur-2xl group-hover:scale-110 transition-transform"></div>
            <Award size={40} className="text-white mb-6" />
            <h3 className="text-3xl font-bold mb-4 font-serif">Our Mission</h3>
            <p className="text-white leading-relaxed font-medium">
              To build a sustainable ecosystem for Nigerian artists through
              professional connection, global advocacy, and technical
              excellence.
            </p>
          </div>
          <div className="bg-[#bb6e31]/10 text-[#bb6e31] p-12 rounded-[3rem] relative overflow-hidden shadow-lg border border-[#bb6e31]/20 group">
            <Eye size={40} className="text-[#bb6e31] mb-6" />
            <h3 className="text-3xl font-bold mb-4 font-serif">Our Vision</h3>
            <p className="text-[#bb6e31]/80 leading-relaxed font-medium">
              To establish Lagos as the definitive global capital of
              contemporary African art, bridging tradition with the future.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;

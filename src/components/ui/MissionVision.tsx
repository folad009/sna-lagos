import { Award, Eye } from "lucide-react";

const MissionVision = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-emerald-800 text-white p-12 rounded-[3rem] relative overflow-hidden shadow-2xl group">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-white/5 rounded-full blur-2xl group-hover:scale-110 transition-transform"></div>
            <Award size={40} className="text-emerald-300 mb-6" />
            <h3 className="text-3xl font-bold mb-4 font-serif">Our Mission</h3>
            <p className="text-emerald-100/90 leading-relaxed font-medium">
              To build a sustainable ecosystem for Nigerian artists through
              professional connection, global advocacy, and technical
              excellence.
            </p>
          </div>
          <div className="bg-emerald-50 text-emerald-900 p-12 rounded-[3rem] relative overflow-hidden shadow-lg border border-emerald-100 group">
            <Eye size={40} className="text-emerald-800 mb-6" />
            <h3 className="text-3xl font-bold mb-4 font-serif">Our Vision</h3>
            <p className="text-emerald-800/80 leading-relaxed font-medium">
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

import React from "react";
import { SectionHeading } from "../components/ui/SectionHeading";
import { MOCK_MEMBERS, LEADERSHIP_TEAM } from "../data/mockData";
import { Users, ShieldCheck, Sparkles, Heart, Award, Eye, History } from "lucide-react";

const AboutView = () => {
  return (
    <div className="pt-32 pb-20 overflow-hidden">
      {/* Mission Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="animate-in slide-in-from-left duration-700">
            <SectionHeading
              title="Guardian of Nigeria's Artistic Soul"
              subtitle="Since 1963, the Lagos Chapter has been the pulsating heart of contemporary African art, bridging tradition and futuristic expression."
            />
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Founded during the dawn of independence, the Society of Nigerian
              Artists has consistently championed the cultural significance of
              visual arts, ensuring that the Nigerian narrative is preserved and
              celebrated globally.
            </p>
            <div className="flex space-x-4">
              <div className="flex -space-x-3">
                {MOCK_MEMBERS.map((m) => (
                  <img
                    key={m.id}
                    src={m.avatar}
                    className="w-10 h-10 rounded-full border-2 border-white object-cover"
                    alt="Artist"
                  />
                ))}
              </div>
              <p className="text-sm font-bold text-gray-500 flex items-center">
                <Users size={16} className="mr-2" /> 500+ Active Members in
                Lagos
              </p>
            </div>
          </div>
          <div className="relative animate-in zoom-in duration-700">
            <div className="aspect-[4/5] bg-emerald-50 rounded-[3rem] overflow-hidden relative shadow-2xl border border-gray-100">
              <img
                src="https://images.unsplash.com/photo-1549490349-8643362247b5?w=1200&fit=crop"
                className="w-full h-full object-cover"
                alt="Art Workshop"
              />
              <div className="absolute inset-0 bg-emerald-900/10"></div>
            </div>
            <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-3xl shadow-xl max-w-xs hidden md:block border border-gray-50">
              <p className="text-[#bb6e31] font-bold text-lg mb-2 italic font-serif">
                "Art is the only way to run away without leaving home."
              </p>
              <p className="text-black text-[10px] uppercase tracking-widest font-bold">
                — Society Proverb
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values Section */}
      <section className="bg-gray-50 py-24 mb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Our Core Pillars"
            subtitle="The values that guide every stroke of our collective brush."
            centered
          />
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: <ShieldCheck />,
                title: "Excellence",
                desc: "Upholding the highest professional standards in artistry and curation.",
              },
              {
                icon: <History />,
                title: "Heritage",
                desc: "Preserving indigenous techniques like Adire and Nok-inspired sculpture.",
              },
              {
                icon: <Sparkles />,
                title: "Innovation",
                desc: "Leading the charge in NFT, digital transformation, and experimental media.",
              },
              {
                icon: <Heart />,
                title: "Community",
                desc: "Fostering mentorship and collaborative mural projects across Lagos.",
              },
            ].map((val, i) => (
              <div
                key={i}
                className="bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-2 border border-gray-100"
              >
                <div className="w-16 h-16 bg-[#bb6e31]/10 text-[#bb6e31] rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:rotate-12 group-hover:scale-110">
                  {React.cloneElement(val.icon as React.ReactElement, {
                    size: 32,
                  })}
                </div>
                <h4 className="text-2xl font-bold mb-4 font-serif">
                  {val.title}
                </h4>
                <p className="text-gray-500 leading-relaxed text-sm">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Mission & Vision Blocks */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-[#bb6e31] text-white p-16 rounded-[3.5rem] relative overflow-hidden group shadow-2xl">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/5 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700"></div>
            <Award size={48} className="text-white mb-8" />
            <h3 className="text-4xl font-bold mb-6 font-serif">The Mission</h3>
            <p className="text-lg text-white leading-relaxed opacity-90 font-medium">
              To cultivate a resilient ecosystem for visual artists in Lagos. We
              provide the structural support needed for world-class exhibitions,
              continuous professional development, and legal advocacy, ensuring
              our members compete on the global stage.
            </p>
          </div>
          <div className="bg-white border-2 border-[#bb6e31]/10 p-16 rounded-[3.5rem] relative overflow-hidden group shadow-lg">
            <Eye size={48} className="text-[#bb6e31] mb-8" />
            <h3 className="text-4xl font-bold mb-6 font-serif text-[#bb6e31]">
              The Vision
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed font-medium">
              To transform Lagos into the definitive global hub for contemporary
              African art. We envision a future where tradition and modern
              innovation coexist, creating a legacy where every Nigerian artist
              can monetize their craft and thrive sustainably.
            </p>
          </div>
        </div>
      </div>

      {/* Executive Leadership Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-3 mb-12">
          <div className="w-12 h-12 bg-[#bb6e31] rounded-xl flex items-center justify-center text-white shadow-lg">
            <Users size={24} />
          </div>
          <div>
            <h3 className="text-3xl font-bold font-serif">Executive Council</h3>
            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">
              Leadership 2024 - 2026
            </p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {LEADERSHIP_TEAM.map((leader, idx) => (
            <div key={idx} className="group">
              <div className="relative mb-8">
                <div className="aspect-[3/4] overflow-hidden shadow-xl border border-gray-100">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#bb6e31]/90 via-[#bb6e31]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                    <p className="text-sm text-white leading-relaxed italic">
                      {leader.bio}
                    </p>
                  </div>
                </div>
              </div>
              <h4 className="text-2xl font-bold font-serif mb-1 text-gray-900">
                {leader.name}
              </h4>
              <p className="text-[#bb6e31] font-bold text-xs uppercase tracking-[0.2em]">
                {leader.role}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Final CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-32">
        <div className="bg-[#bb6e31] rounded-[4rem] p-16 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-10"></div>
          <div className="relative z-10">
            <h3 className="text-4xl md:text-5xl font-bold mb-6 font-serif">
              Become Part of the Legacy
            </h3>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto font-medium">
              Whether you are an established master or a rising star, SNA Lagos
              offers the community and platform you need to excel.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <button className="bg-white text-[#bb6e31] px-10 py-5 rounded-2xl font-bold text-lg hover:bg-emerald-50 transition-all shadow-xl hover:scale-105 active:scale-95">
                Apply for Membership
              </button>
              <button className="border-2 border-white/20 bg-white/5 backdrop-blur-md text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all shadow-xl hover:scale-105 active:scale-95">
                Contact Secretariat
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutView;

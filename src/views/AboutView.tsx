import React, { useEffect, useState, useRef } from "react";

import { SectionHeading } from "../components/ui/SectionHeading";
import { Users, ShieldCheck, Sparkles, Heart, Award, Eye, History } from "lucide-react";
import { getLeadership, getArtists } from "../api/wordpress";
import { Leader } from "../types";
import { LeadershipCarousel } from "../components/ui/LeadershipCarousel";

const AboutView = () => {
const [leaders, setLeaders] = useState<Leader[]>([]);
const [loadingLeaders, setLoadingLeaders] = useState(true);
const [membersPreview, setMembersPreview] = useState<any[]>([]);

const [leadersError, setLeadersError] = useState(false);
const membersFetchedRef = useRef(false);
const loadLeadersRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadLeaders = async () => {
      setLoadingLeaders(true);
      setLeadersError(false);
      try {
        const data = await getLeadership();
        if (!cancelled) setLeaders(data);
      } catch (err) {
        console.error("Leadership fetch failed", err);
        if (!cancelled) setLeadersError(true);
      } finally {
        if (!cancelled) setLoadingLeaders(false);
      }
    };

    loadLeadersRef.current = () => {
      cancelled = false;
      loadLeaders();
    };

    loadLeaders();

    const onVisible = () => {
      if (document.visibilityState === "visible") loadLeaders();
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      cancelled = true;
      loadLeadersRef.current = null;
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  useEffect(() => {
    if (membersFetchedRef.current) return;
    membersFetchedRef.current = true;

    let cancelled = false;
    getArtists()
      .then((members) => {
        if (!cancelled) setMembersPreview(members.slice(0, 6));
      })
      .catch((err) => {
        console.error("Artists fetch failed", err);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="pt-32 pb-20 overflow-x-hidden">
      {/* Mission Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="animate-in slide-in-from-left duration-700">
            <SectionHeading
              title="About SNA Lagos"
            />
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              The Society of Nigerian Artists (SNA) is the professional body for all practicing Visual Artists in Nigeria. It exists to encourage and promote Nigerian artists and serves as a platform for them to air their views and contribute positively to national development. It was founded in 1963 by artists emerging from various schools and colleges of art and members of the Zaria Art Society.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              In January 1964, the Society was inaugurated with its headquarters in Lagos and an exhibition was held that featured 84 works by 12 of the founding members. Subsequent exhibitions featured more artists and works drawn from broad categories of entry including sculpture, painting, graphics, photography, print, drawing, ceramics and textile design. At inception, the Society allowed membership to only formally trained artists. Presently, membership has expanded to include art students in tertiary institutions, self-taught and Nigerian artists in Diaspora.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              The Lagos State Chapter was established in 1982.
            </p>
            <div className="flex space-x-4">
              <div className="flex -space-x-3">
                {membersPreview.map((m) => (
                  <img
                    key={m.id}
                    src={m.avatar}
                    className="w-10 h-10 rounded-full border-2 border-white object-cover"
                    alt={m.name}
                  />
                ))}

                {loadingLeaders &&
                  Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-gray-200 animate-pulse border-2 border-white"
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
            <div className="aspect-[4/5] bg-brand-50 rounded-[3rem] overflow-hidden relative shadow-2xl border border-gray-100">
              <img
                src="https://images.unsplash.com/photo-1549490349-8643362247b5?w=1200&fit=crop"
                className="w-full h-full object-cover"
                alt="Art Workshop"
              />
              <div className="absolute inset-0 bg-brand-900/10"></div>
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

      {/* Core Values Section
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
                  {React.cloneElement(
                    val.icon as React.ReactElement<{ size?: number }>,
                    {
                      size: 32,
                    }
                  )}
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
      </section> */}

      {/* Detailed Mission & Vision Blocks */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-[#bb6e31] text-white p-16 rounded-[3.5rem] relative overflow-hidden group shadow-2xl">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/5 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700"></div>
            <h3 className="text-4xl font-bold mb-6 font-serif">The Mission</h3>
            <p className="text-lg text-white leading-relaxed opacity-90 font-medium">
              To cultivate a resilient ecosystem for visual artists in Lagos. We
              provide the structural support needed for world-class exhibitions,
              continuous professional development, and legal advocacy, ensuring
              our members compete on the global stage.
            </p>
          </div>
          <div className="bg-white border-2 border-[#bb6e31]/10 p-16 rounded-[3.5rem] relative overflow-hidden group shadow-lg">
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
        {loadingLeaders && (
          <p className="text-gray-400 text-center py-10">
            Loading leadership...
          </p>
        )}

        {!loadingLeaders && leadersError && (
          <div className="flex flex-col items-center gap-4 py-10 text-center">
            <p className="text-red-500">Unable to load leadership.</p>
            <button
              type="button"
              onClick={() => loadLeadersRef.current?.()}
              className="rounded-2xl bg-[#bb6e31] px-6 py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#8c3e02]"
            >
              Try again
            </button>
          </div>
        )}

        {!loadingLeaders && !leadersError && leaders.length === 0 && (
          <p className="text-gray-400 text-center py-10">
            No leadership data available.
          </p>
        )}

        {!loadingLeaders && !leadersError && leaders.length > 0 && (
          <LeadershipCarousel leaders={leaders} />
        )}
      </div>

      {/* Final CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-32">
        <div className="bg-[#bb6e31] rounded-[4rem] p-16 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-10"></div>
          <div className="relative z-10">
            <h3 className="text-4xl md:text-5xl font-bold mb-6 font-serif capitalize">
              Become a member
            </h3>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto font-medium">
              Whether you are an established master or a rising star, SNA Lagos
              offers the community and platform you need to excel.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <button className="bg-white text-[#bb6e31] px-10 py-5 rounded-2xl font-bold text-lg hover:bg-brand-50 transition-all shadow-xl hover:scale-105 active:scale-95">
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

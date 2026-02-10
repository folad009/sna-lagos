import { Hero } from "../components/ui/Hero";
import { ArtMarquee } from "../components/ui/ArtMarquee";
import { SectionHeading } from "../components/ui/SectionHeading";
import { MOCK_MEMBERS } from "../data/mockData";
import { MemberCard } from "../components/ui/MemberCard";
import { UpcomingEvents } from "../components/ui/UpcomingEvent";
import { JoinJourney } from "../components/ui/JoinJourney";
import { PartnerBar } from "../components/ui/PartnersBar";
import MissionVision from "../components/ui/MissionVision";
import { ChevronRight } from "lucide-react";
import { Member } from "../types";

interface HomeViewProps {
  onExplore: () => void;
  onSelectMember: (member: Member) => void;
}

const HomeView = ({ onExplore, onSelectMember }: HomeViewProps) => {
  return (
    <div className="animate-in fade-in duration-700">
      <Hero onExplore={onExplore} />

      <ArtMarquee />

      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <SectionHeading
            title="Masters & Rising Stars"
            subtitle="Highlighting the professional members of the Lagos Chapter who are defining the contemporary narrative."
          />
          <button
            onClick={onExplore}
            className="hidden md:flex items-center text-emerald-800 font-bold mb-12 hover:translate-x-1 transition group"
          >
            View Full Directory{" "}
            <ChevronRight className="ml-1 group-hover:translate-x-1" />
          </button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {MOCK_MEMBERS.filter((m) => m.featured)
            .slice(0, 3)
            .map((member) => (
              <MemberCard
                key={member.id}
                member={member}
                onClick={() => onSelectMember(member)}
              />
            ))}
        </div>
      </section>

      <MissionVision />

      <UpcomingEvents />

      <JoinJourney />

      <PartnerBar />

      {/* Newsletter Subscription */}
      <section className="py-24 bg-emerald-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-10"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h3 className="text-4xl md:text-5xl font-bold mb-6 font-serif">
            The Collector's Circle
          </h3>
          <p className="text-lg text-emerald-100/70 mb-12 leading-relaxed">
            Subscribe to our curated monthly newsletter for early access to
            private viewings, artist studio visits, and exclusive collection
            opportunities.
          </p>
          <form
            className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 bg-white/10 border border-white/20 px-6 py-4 rounded-xl outline-none focus:ring-2 focus:ring-emerald-400 transition placeholder:text-white/40 font-medium"
            />
            <button className="bg-white text-emerald-900 px-8 py-4 rounded-xl font-bold hover:bg-emerald-50 transition shadow-xl active:scale-95">
              Join Circle
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default HomeView;

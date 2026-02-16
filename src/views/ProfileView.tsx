import { useState, useEffect, useMemo } from "react";
import { Member, PortfolioItem } from "../types";
import {
  ChevronRight,
  Mail,
  MapPin,
  BookOpen,
  Instagram,
  Twitter,
  Globe,
  Share2,
  X,
  Eye,
} from "lucide-react";
import { ShareModal } from "../components/modals/ShareModal";
import { ContactModal } from "../components/modals/ContactModal";
import { useMetaTags } from "../hooks/useMetaTags";

const ProfileView = ({
  member,
  onBack,
}: {
  member: Member;
  onBack: () => void;
}) => {
  const [portfolioFilter, setPortfolioFilter] = useState<string>("All");
  const [selectedWork, setSelectedWork] = useState<PortfolioItem | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

 useMetaTags(
  `${member.name} | ${member.category} Artist | SNA Lagos`,
  `${member.name} is a professional ${member.category} artist based in ${member.location}. Member since ${member.joinedDate}. ${(member.bio || "").substring(0, 100)}...`,
  member.avatar
);


  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedWork(null);
        setIsShareModalOpen(false);
        setIsContactModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  useEffect(() => {
    if (selectedWork || isShareModalOpen || isContactModalOpen)
      document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [selectedWork, isShareModalOpen, isContactModalOpen]);

  const portfolioCategories = useMemo(() => {
    const cats = new Set(member.portfolio.map((item) => item.category));
    return ["All", ...Array.from(cats)];
  }, [member]);

  const filteredPortfolio = useMemo(() => {
    if (portfolioFilter === "All") return member.portfolio;
    return member.portfolio.filter((item) => item.category === portfolioFilter);
  }, [member, portfolioFilter]);

  return (
    <div className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={onBack}
          className="flex items-center text-gray-500 hover:text-emerald-800 mb-8 font-semibold transition group"
        >
          <ChevronRight
            size={20}
            className="rotate-180 mr-1 transition-transform group-hover:-translate-x-1"
          />{" "}
          Back to Directory
        </button>
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <div className="sticky top-32">
              <div className="rounded-3xl overflow-hidden shadow-2xl mb-8">
                <img
                  src={member.avatar}
                  alt={member.name}
                  loading="lazy"
                  className="w-full h-[500px] object-cover"
                />
              </div>
              <div className="flex flex-col space-y-4">
                <div className="flex items-center space-x-2 text-gray-600">
                  <Mail size={18} />
                  <span>{member.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <MapPin size={18} />
                  <span>{member.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <BookOpen size={18} />
                  <span>Member since {member.joinedDate}</span>
                </div>
                <div className="pt-6 flex flex-col space-y-4 border-t border-gray-100">
                  <div className="flex items-center space-x-6">
                    {member.socials?.instagram && (
                      <a
                        href={member.socials.instagram}
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-400 hover:text-pink-600 transition-colors"
                      >
                        <Instagram size={24} />
                      </a>
                    )}
                    {member.socials?.twitter && (
                      <a
                        href={member.socials.twitter}
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-400 hover:text-blue-400 transition-colors"
                      >
                        <Twitter size={24} />
                      </a>
                    )}
                    {member.socials?.website && (
                      <a
                        href={member.socials.website}
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-400 hover:text-emerald-600 transition-colors"
                      >
                        <Globe size={24} />
                      </a>
                    )}
                    <button
                      onClick={() => setIsShareModalOpen(true)}
                      className="text-gray-400 hover:text-emerald-800 transition-colors ml-auto flex items-center space-x-2 font-bold text-xs uppercase tracking-widest"
                    >
                      <Share2 size={18} />
                      <span>Share</span>
                    </button>
                  </div>
                  <button
                    onClick={() => setIsContactModalOpen(true)}
                    className="w-full bg-emerald-800 text-white py-4 rounded-2xl font-bold flex items-center justify-center space-x-3 hover:bg-emerald-900 transition shadow-lg hover:shadow-emerald-900/20 active:scale-[0.98]"
                  >
                    <Mail size={20} />
                    <span>Contact Artist</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-8">
            <div className="mb-12">
              <span className="text-emerald-800 font-bold uppercase tracking-widest text-sm">
                {member.category}
              </span>
              <h1 className="text-5xl font-bold mt-2 mb-6 font-serif">
                {member.name}
              </h1>
              <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
                
                <p className="mt-4">
                 {member.bio}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-4">
              <h2 className="text-3xl font-bold font-serif">Selected Works</h2>
              <div className="flex space-x-2 overflow-x-auto no-scrollbar pb-1">
                {portfolioCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setPortfolioFilter(cat)}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition whitespace-nowrap ${portfolioFilter === cat ? "bg-emerald-800 text-white shadow-lg" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-6 mb-20 animate-in fade-in duration-500">
              {filteredPortfolio.map((item) => (
                <div
                  key={item.url}
                  onClick={() => setSelectedWork(item)}
                  className="group relative rounded-2xl overflow-hidden cursor-zoom-in aspect-square shadow-lg"
                >
                  <img
                    src={item.url}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex flex-col items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="text-white font-bold text-lg mb-1">
                      {item.title}
                    </span>
                    <span className="text-emerald-200 text-xs uppercase tracking-widest font-bold">
                      {item.category}
                    </span>
                    <div className="mt-4 flex items-center text-white/90 text-sm font-semibold">
                      <Eye size={18} className="mr-2" /> View Full
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        member={member}
      />
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        member={member}
      />
      {selectedWork && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-300"
          onClick={() => setSelectedWork(null)}
        >
          <button
            onClick={() => setSelectedWork(null)}
            className="absolute top-6 right-6 text-white/50 hover:text-white transition p-3 bg-white/10 rounded-full z-[110]"
          >
            <X size={28} />
          </button>
          <div
            className="relative w-full h-full flex flex-col items-center justify-center gap-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full h-[75vh] flex items-center justify-center">
              <img
                src={selectedWork.url}
                alt={selectedWork.title}
                className="max-w-full max-h-full object-contain rounded-lg shadow-[0_0_50px_rgba(0,0,0,0.5)] animate-in zoom-in duration-300"
              />
            </div>
            <div className="text-center text-white animate-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-3xl md:text-4xl font-bold font-serif mb-2">
                {selectedWork.title}
              </h3>
              <p className="text-emerald-400 uppercase tracking-[0.2em] text-xs font-bold">
                {selectedWork.category}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileView;

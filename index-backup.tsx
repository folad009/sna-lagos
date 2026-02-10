import React, { useState, useEffect, useMemo, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  User, 
  Search, 
  Menu, 
  X, 
  Palette, 
  Award, 
  BookOpen, 
  Mail, 
  MapPin, 
  Instagram, 
  Twitter, 
  Globe,
  LogIn,
  LogOut,
  ChevronRight,
  Filter,
  Eye,
  Save,
  ArrowLeft,
  Share2,
  Copy,
  Check,
  Facebook,
  Linkedin,
  MessageCircle,
  TrendingUp,
  BarChart3,
  Users,
  Send,
  AtSign,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  History,
  Heart,
  Calendar,
  Clock,
  ExternalLink
} from 'lucide-react';

// --- Types ---
type Category = 'Painting' | 'Sculpture' | 'Digital Art' | 'Mixed Media' | 'Photography' | 'Textiles';

interface PortfolioItem {
  url: string;
  title: string;
  category: string;
}

interface Member {
  id: string;
  name: string;
  category: Category;
  bio: string;
  email: string;
  location: string;
  avatar: string;
  portfolio: PortfolioItem[];
  joinedDate: string;
  featured?: boolean;
  socials?: {
    instagram?: string;
    twitter?: string;
    website?: string;
  };
}

interface Leader {
  name: string;
  role: string;
  image: string;
  bio: string;
}

// --- Mock Data ---
const CATEGORIES: Category[] = ['Painting', 'Sculpture', 'Digital Art', 'Mixed Media', 'Photography', 'Textiles'];

const MOCK_MEMBERS: Member[] = [
  {
    id: '1',
    name: 'Adekunle Olusegun',
    category: 'Painting',
    bio: 'Famed for vibrant oil paintings capturing the hustle and bustle of Lagos markets. His work explores the interplay of light and urban chaos.',
    email: 'ade@art.ng',
    location: 'Ikeja, Lagos',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    portfolio: [
      { url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1200&fit=crop', title: 'Market Rush', category: 'Oil Paintings' },
      { url: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=1200&fit=crop', title: 'Street Echoes', category: 'Sketches' }
    ],
    joinedDate: '2018',
    featured: true,
    socials: { instagram: 'https://instagram.com', twitter: 'https://twitter.com', website: 'https://portfolio.com' }
  },
  {
    id: '2',
    name: 'Chinwe Egwuatu',
    category: 'Sculpture',
    bio: 'Working primarily with recycled bronze and wood, Chinwe creates ethereal figures that reflect Igbo mythology and ancestral spirits.',
    email: 'chinwe@studio.ng',
    location: 'Lekki Phase 1, Lagos',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    portfolio: [
      { url: 'https://images.unsplash.com/photo-1544411047-c4915842127b?w=1200&fit=crop', title: 'Ancestral Call', category: 'Bronze' },
      { url: 'https://images.unsplash.com/photo-1561839561-b13bcfe95249?w=1200&fit=crop', title: 'Iroko Spirit', category: 'Wood' }
    ],
    joinedDate: '2020',
    featured: true,
    socials: { instagram: 'https://instagram.com', twitter: 'https://twitter.com' }
  },
  {
    id: '3',
    name: 'Tunde Afolayan',
    category: 'Digital Art',
    bio: 'A pioneer in the Nigerian NFT space, Tunde blends traditional Yoruba patterns with futuristic 3D environments.',
    email: 'tunde@pixels.ng',
    location: 'Surulere, Lagos',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    portfolio: [
      { url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&fit=crop', title: 'Cyber Ife', category: '3D Render' },
      { url: 'https://images.unsplash.com/photo-1633167606207-d840b5070fc2?w=1200&fit=crop', title: 'Odua VR', category: 'Concept Art' }
    ],
    joinedDate: '2021',
    featured: true,
    socials: { website: 'https://portfolio.com' }
  },
  {
    id: '4',
    name: 'Bisi Adeniran',
    category: 'Textiles',
    bio: 'Revitalizing Adire techniques for high fashion. Her works have been featured in Lagos fashion spaces globally.',
    email: 'bisi@adire.com',
    location: 'Victoria Island, Lagos',
    avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop',
    portfolio: [
      { url: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=1200&fit=crop', title: 'Indigo Dreams', category: 'Adire' },
      { url: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=1200&fit=crop', title: 'Loom Rhythms', category: 'Fabric Design' }
    ],
    joinedDate: '2015',
    featured: true,
    socials: { instagram: 'https://instagram.com' }
  }
];

const LEADERSHIP_TEAM: Leader[] = [
  {
    name: 'Dr. Kolade Oshinowo',
    role: 'Chairman',
    image: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=400&h=400&fit=crop',
    bio: 'A veteran artist with over 40 years of experience, specializing in social-cultural depictions of Nigerian life.'
  },
  {
    name: 'Ndidi Dike',
    role: 'Vice Chairperson',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop',
    bio: 'Renowned sculptor and painter whose work examines the intersection of history, politics, and consumerism.'
  },
  {
    name: 'Oliver Enwonwu',
    role: 'Secretary General',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop',
    bio: 'Artist, curator and brand strategist. Son of the legendary Ben Enwonwu, continuing the legacy of art advocacy.'
  },
  {
    name: 'Peju Alatise',
    role: 'Treasurer',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
    bio: 'Interdisciplinary artist and architect known for large-scale installations addressing gender and identity.'
  }
];

// --- Helper for Dynamic Meta Tags ---
const updateMetaTags = (title: string, description: string, image?: string) => {
  document.title = title;
  const setMeta = (name: string, content: string, property = false) => {
    let el = property ? document.querySelector(`meta[property="${name}"]`) : document.querySelector(`meta[name="${name}"]`);
    if (!el) {
      el = document.createElement('meta');
      if (property) el.setAttribute('property', name);
      else el.setAttribute('name', name);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };
  setMeta('description', description);
  setMeta('og:title', title, true);
  setMeta('og:description', description, true);
  if (image) setMeta('og:image', image, true);
  setMeta('og:type', 'profile', true);
};

// --- Components ---

const Navbar = ({ activeView, setView, user, onLogout }: any) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => { setView('home'); setIsMobileMenuOpen(false); }}>
            <div className="w-10 h-10 art-gradient rounded-lg flex items-center justify-center text-white font-bold text-xl">
              S
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight uppercase">SNA <span className="text-emerald-800">LAGOS</span></span>
              <p className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold -mt-1">Society of Nigerian Artists</p>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => setView('home')} className={`text-sm font-medium hover:text-emerald-700 transition ${activeView === 'home' ? 'text-emerald-700 underline underline-offset-8' : 'text-gray-600'}`}>Home</button>
            <button onClick={() => setView('directory')} className={`text-sm font-medium hover:text-emerald-700 transition ${activeView === 'directory' ? 'text-emerald-700 underline underline-offset-8' : 'text-gray-600'}`}>Directory</button>
            <button onClick={() => setView('about')} className={`text-sm font-medium hover:text-emerald-700 transition ${activeView === 'about' ? 'text-emerald-700 underline underline-offset-8' : 'text-gray-600'}`}>Mission</button>
            {user ? (
              <div className="flex items-center space-x-4">
                <button onClick={() => setView('dashboard')} className="flex items-center space-x-2 bg-emerald-50 text-emerald-800 px-4 py-2 rounded-full text-sm font-semibold hover:bg-emerald-100 transition">
                  <User size={16} />
                  <span>Dashboard</span>
                </button>
                <button onClick={onLogout} title="Logout" className="text-gray-500 hover:text-red-500 transition-colors"><LogOut size={18} /></button>
              </div>
            ) : (
              <button onClick={() => setView('login')} className="bg-emerald-800 text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-emerald-900 transition flex items-center space-x-2 shadow-md">
                <LogIn size={16} />
                <span>Member Portal</span>
              </button>
            )}
          </div>

          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className={`text-gray-600 p-2 transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-90' : 'rotate-0'}`}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-8 px-6 flex flex-col space-y-4 shadow-2xl animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-300 origin-top">
          <button onClick={() => { setView('home'); setIsMobileMenuOpen(false); }} className={`text-left text-xl font-bold font-serif transition-colors py-2 ${activeView === 'home' ? 'text-emerald-800' : 'text-gray-700'}`}>Home</button>
          <button onClick={() => { setView('directory'); setIsMobileMenuOpen(false); }} className={`text-left text-xl font-bold font-serif transition-colors py-2 ${activeView === 'directory' ? 'text-emerald-800' : 'text-gray-700'}`}>Directory</button>
          <button onClick={() => { setView('about'); setIsMobileMenuOpen(false); }} className={`text-left text-xl font-bold font-serif transition-colors py-2 ${activeView === 'about' ? 'text-emerald-800' : 'text-gray-700'}`}>Mission</button>
          <div className="pt-6 border-t border-gray-50">
            {user ? (
              <button onClick={() => { setView('dashboard'); setIsMobileMenuOpen(false); }} className="w-full bg-emerald-50 text-emerald-800 py-4 rounded-2xl font-bold flex items-center justify-center space-x-2">
                <User size={18} />
                <span>Dashboard</span>
              </button>
            ) : (
              <button onClick={() => { setView('login'); setIsMobileMenuOpen(false); }} className="w-full bg-emerald-800 text-white py-4 rounded-2xl font-bold flex items-center justify-center space-x-2 shadow-lg">
                <LogIn size={18} />
                <span>Member Portal</span>
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

const SectionHeading = ({ title, subtitle, centered = false }: { title: string, subtitle?: string, centered?: boolean }) => (
  <div className={`mb-12 ${centered ? 'text-center flex flex-col items-center' : ''}`}>
    <h2 className="text-3xl md:text-5xl font-bold mb-4 font-serif">{title}</h2>
    {subtitle && <p className="text-gray-500 max-w-2xl text-lg leading-relaxed">{subtitle}</p>}
    <div className={`w-24 h-1.5 bg-emerald-800 mt-6 rounded-full ${centered ? 'mx-auto' : ''}`}></div>
  </div>
);

const ArtMarquee = () => {
  const images = [
    "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1544411047-c4915842127b?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1561839561-b13bcfe95249?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?w=400&h=400&fit=crop"
  ];

  return (
    <div className="relative py-12 bg-white overflow-hidden select-none">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...images, ...images].map((src, i) => (
          <div key={i} className="mx-4 w-64 h-64 shrink-0 rounded-3xl overflow-hidden shadow-lg transform transition-transform hover:scale-105">
            <img src={src} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" alt="SNA Artwork" />
          </div>
        ))}
      </div>
    </div>
  );
};

const Hero = ({ onExplore }: any) => (
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
          Where Nigerian <span className="italic text-emerald-800">Mastery</span> Meets Tomorrow.
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed max-w-2xl">
          SNA Lagos Chapter is the definitive professional body for visual artists, 
          uniting over 500 creators across the Heart of Africa.
        </p>
        <div className="flex flex-wrap gap-6 mb-20">
          <button onClick={onExplore} className="bg-emerald-800 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-emerald-900 shadow-2xl transition transform hover:-translate-y-1 active:scale-95">
            Explore Directory
          </button>
          <button className="border-2 border-emerald-800 text-emerald-800 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-emerald-50 transition transform hover:-translate-y-1 active:scale-95">
            Membership Portal
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 border-t border-gray-100 pt-12">
          <div>
            <p className="text-4xl font-bold text-emerald-950 font-serif mb-1">500+</p>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Professional Members</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-emerald-950 font-serif mb-1">60+</p>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Years of Heritage</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-emerald-950 font-serif mb-1">12</p>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Annual Exhibitions</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-emerald-950 font-serif mb-1">24/7</p>
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Art Advocacy</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const UpcomingEvents = () => {
  const events = [
    { title: "Lagos Juried Exhibition 2024", date: "Oct 12 - 20", location: "National Theatre, Iganmu", category: "Exhibition" },
    { title: "Digital Art & NFT Summit", date: "Nov 05", location: "Nike Art Gallery, Lekki", category: "Workshop" },
    { title: "Zaria Rebels: Retrospective", date: "Dec 15 - Jan 10", location: "Lagos State Art Center", category: "Exhibition" }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <SectionHeading title="Society Calendar" subtitle="Join us at our upcoming events, exhibitions, and professional workshops across Lagos." />
          <button className="hidden md:flex items-center text-emerald-800 font-bold mb-12 hover:translate-x-1 transition group">
            Full Calendar <ChevronRight className="ml-1 group-hover:translate-x-1" />
          </button>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {events.map((event, i) => (
            <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-800 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110">
                  <Calendar size={24} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-gray-100 text-gray-500 rounded-full">{event.category}</span>
              </div>
              <h4 className="text-2xl font-bold mb-4 font-serif leading-tight">{event.title}</h4>
              <div className="space-y-2 mb-8 text-sm text-gray-500">
                <p className="flex items-center"><Clock size={16} className="mr-2 text-emerald-700" /> {event.date}</p>
                <p className="flex items-center"><MapPin size={16} className="mr-2 text-emerald-700" /> {event.location}</p>
              </div>
              <button className="w-full py-4 rounded-xl border border-emerald-800/10 font-bold text-emerald-800 group-hover:bg-emerald-800 group-hover:text-white transition-all">
                Register Interest
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const JoinJourney = () => (
  <section className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeading title="Your Creative Journey" subtitle="How to become a professional member of Nigeria's premier artistic society." centered />
      <div className="grid md:grid-cols-3 gap-16 relative mt-20">
        <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-emerald-100 -z-10"></div>
        {[
          { step: "01", title: "Submit Portfolio", desc: "Share your professional body of work and CV with the Lagos Secretariat for review." },
          { step: "02", title: "Review Board", desc: "Our executive council of masters evaluates applications quarterly for technical mastery." },
          { step: "03", title: "Full Membership", desc: "Gain voting rights, exhibition priority, and access to legal advocacy programs." }
        ].map((item, i) => (
          <div key={i} className="text-center relative">
            <div className="w-24 h-24 bg-white border-4 border-emerald-800 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl text-3xl font-bold text-emerald-800 font-serif">
              {item.step}
            </div>
            <h4 className="text-2xl font-bold mb-4 font-serif">{item.title}</h4>
            <p className="text-gray-500 leading-relaxed max-w-xs mx-auto text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const PartnerBar = () => (
  <div className="py-12 border-y border-gray-100 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <p className="text-center text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-8">Supported by & Partners with</p>
      <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
         <span className="text-2xl font-bold font-serif">NATIONAL THEATRE</span>
         <span className="text-2xl font-bold font-serif">NIKE ART GALLERY</span>
         <span className="text-2xl font-bold font-serif">LAGOS STATE GOVT</span>
         <span className="text-2xl font-bold font-serif">VISUAL ARTS COUNCIL</span>
      </div>
    </div>
  </div>
);

const MemberCard = ({ member, onClick }: { member: Member, onClick: () => void, key?: React.Key }) => (
  <div 
    onClick={onClick}
    className="group bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer"
  >
    <div className="relative h-80 overflow-hidden">
      <img 
        src={member.avatar} 
        alt={member.name} 
        loading="lazy" 
        className="w-full h-full object-cover transition duration-500 group-hover:scale-110" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
         <p className="text-white font-bold text-sm tracking-widest uppercase">View Portfolio</p>
      </div>
      <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-emerald-800 shadow-sm">
        {member.category}
      </div>
    </div>
    <div className="p-8">
      <h3 className="text-2xl font-bold mb-2 group-hover:text-emerald-800 transition font-serif">{member.name}</h3>
      <p className="text-gray-500 text-sm line-clamp-2 mb-6 leading-relaxed">{member.bio}</p>
      <div className="flex items-center text-xs text-gray-400 font-bold uppercase tracking-wider">
        <MapPin size={14} className="mr-2 text-emerald-800" />
        {member.location}
      </div>
    </div>
  </div>
);

const CategoryMultiFilter = ({ selected, onToggle }: { selected: Category[], onToggle: (cat: Category) => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between min-w-[240px] px-6 py-4 bg-white border border-gray-200 rounded-2xl text-gray-700 font-bold hover:border-emerald-300 transition shadow-sm"
      >
        <span className="flex items-center">
          <Filter size={18} className="mr-3 text-emerald-800" />
          {selected.length === 0 ? "All Categories" : `${selected.length} Selected`}
        </span>
        <ChevronRight size={18} className={`transition-transform ${isOpen ? 'rotate-90' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)}></div>
          <div className="absolute left-0 top-full mt-3 w-full bg-white border border-gray-100 rounded-2xl shadow-2xl z-20 py-3 overflow-hidden animate-in fade-in slide-in-from-top-2">
            {CATEGORIES.map(cat => (
              <label 
                key={cat}
                className="flex items-center px-4 py-3.5 hover:bg-emerald-50 cursor-pointer transition"
              >
                <input 
                  type="checkbox"
                  className="w-5 h-5 rounded border-gray-300 text-emerald-800 focus:ring-emerald-800 mr-4"
                  checked={selected.includes(cat)}
                  onChange={() => onToggle(cat)}
                />
                <span className={`text-sm font-bold ${selected.includes(cat) ? 'text-emerald-800' : 'text-gray-600'}`}>{cat}</span>
              </label>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const DirectoryView = ({ members, onSelectMember }: { members: Member[], onSelectMember: (m: Member) => void }) => {
  const [search, setSearch] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleCategory = (cat: Category) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const filtered = useMemo(() => {
    return members.filter(m => {
      const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(m.category);
      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategories, members]);

  const suggestions = useMemo(() => {
    if (!search.trim()) return [];
    return members
      .filter(m => m.name.toLowerCase().includes(search.toLowerCase()))
      .slice(0, 5);
  }, [search, members]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
      <SectionHeading 
        title="Member Directory" 
        subtitle="Discover the incredible talent that defines the Lagos art scene. From veteran masters to emerging voices."
      />
      
      <div className="flex flex-col md:flex-row gap-6 mb-12 items-start md:items-center">
        <div className="relative flex-1 w-full" ref={suggestionRef}>
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={22} />
          <input 
            type="text"
            placeholder="Search by artist name..."
            className="w-full pl-14 pr-4 py-5 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-800 transition shadow-sm font-medium"
            value={search}
            onFocus={() => setShowSuggestions(true)}
            onChange={(e) => {
              setSearch(e.target.value);
              setShowSuggestions(true);
            }}
          />
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-3 bg-white border border-gray-100 rounded-2xl shadow-2xl z-20 py-2 overflow-hidden animate-in fade-in slide-in-from-top-2">
              {suggestions.map(member => (
                <button
                  key={member.id}
                  className="w-full text-left px-6 py-4 hover:bg-emerald-50 transition flex items-center space-x-4"
                  onClick={() => {
                    setSearch(member.name);
                    setShowSuggestions(false);
                  }}
                >
                  <img src={member.avatar} className="w-10 h-10 rounded-full object-cover border border-gray-100" alt={member.name} />
                  <div>
                    <p className="font-bold text-gray-800">{member.name}</p>
                    <p className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider">{member.category}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
        
        <CategoryMultiFilter selected={selectedCategories} onToggle={toggleCategory} />

        {selectedCategories.length > 0 && (
          <button 
            onClick={() => setSelectedCategories([])}
            className="text-sm font-bold text-red-600 hover:text-red-700 transition"
          >
            Reset
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mb-10">
        {selectedCategories.map(cat => (
          <span key={cat} className="flex items-center bg-emerald-50 text-emerald-800 px-4 py-1.5 rounded-full text-xs font-bold border border-emerald-100">
            {cat}
            <button onClick={() => toggleCategory(cat)} className="ml-2.5 hover:text-emerald-900 transition-colors"><X size={14}/></button>
          </span>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filtered.map(member => (
            <MemberCard key={member.id} member={member} onClick={() => onSelectMember(member)} />
          ))}
        </div>
      ) : (
        <div className="text-center py-32 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
          <Palette className="mx-auto text-gray-200 mb-6" size={80} />
          <h3 className="text-2xl font-bold text-gray-400 font-serif">No artists found in this category.</h3>
          <button onClick={() => { setSearch(''); setSelectedCategories([]); }} className="mt-6 text-emerald-800 font-bold underline">Reset all filters</button>
        </div>
      )}
    </div>
  );
};

// --- Share Modal Component ---
const ShareModal = ({ isOpen, onClose, member }: { isOpen: boolean, onClose: () => void, member: Member }) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = window.location.href;
  const shareText = `Check out ${member.name}'s portfolio on the Society of Nigerian Artists (Lagos) Directory.`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  const platforms = [
    { name: 'Twitter', icon: <Twitter size={20} />, color: 'bg-black text-white', link: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}` },
    { name: 'Facebook', icon: <Facebook size={20} />, color: 'bg-[#1877F2] text-white', link: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}` },
    { name: 'WhatsApp', icon: <MessageCircle size={20} />, color: 'bg-[#25D366] text-white', link: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}` },
    { name: 'LinkedIn', icon: <Linkedin size={20} />, color: 'bg-[#0077B5] text-white', link: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}` }
  ];

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div 
        className="bg-white rounded-[2.5rem] w-full max-w-md p-8 shadow-2xl relative animate-in zoom-in duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition p-2">
          <X size={24} />
        </button>
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-800 mx-auto mb-4">
            <Share2 size={32} />
          </div>
          <h3 className="text-2xl font-bold font-serif">Share Artist Profile</h3>
          <p className="text-gray-500 mt-2 text-sm">Help spread the word about {member.name}'s work.</p>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-8">
          {platforms.map(p => (
            <a key={p.name} href={p.link} target="_blank" rel="noreferrer" className={`${p.color} flex items-center justify-center space-x-2 py-4 rounded-2xl font-bold transition hover:opacity-90 active:scale-95 text-sm`}>
              {p.icon}
              <span>{p.name}</span>
            </a>
          ))}
        </div>
        <div className="relative group">
          <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-2 ml-1">Profile Link</p>
          <div className="flex items-center bg-gray-50 border border-gray-100 rounded-2xl p-2 pl-4">
            <input readOnly value={shareUrl} className="bg-transparent text-gray-500 text-xs flex-1 outline-none font-medium truncate pr-2"/>
            <button onClick={copyToClipboard} className="bg-white text-emerald-800 p-3 rounded-xl shadow-sm border border-gray-100 hover:bg-emerald-50 transition flex items-center justify-center group-active:scale-95">
              {copied ? <Check size={18} className="text-emerald-600" /> : <Copy size={18} />}
            </button>
          </div>
          {copied && <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-emerald-600 animate-in fade-in slide-in-from-top-1">Link Copied!</span>}
        </div>
      </div>
    </div>
  );
};

const ContactModal = ({ isOpen, onClose, member }: { isOpen: boolean, onClose: () => void, member: Member }) => {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  if (!isOpen) return null;
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      setTimeout(() => {
        setSent(false);
        onClose();
      }, 2000);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-[2.5rem] w-full max-w-lg p-10 shadow-2xl relative animate-in zoom-in duration-300" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-8 right-8 text-gray-400 hover:text-gray-600 transition p-2"><X size={24} /></button>
        <div className="mb-10 text-center">
          <div className="w-16 h-16 bg-emerald-800 rounded-2xl flex items-center justify-center text-white mx-auto mb-4 shadow-lg"><Mail size={32} /></div>
          <h3 className="text-3xl font-bold font-serif">Contact {member.name.split(' ')[0]}</h3>
          <p className="text-gray-500 mt-2 text-sm">Send a direct inquiry for commissions or exhibitions.</p>
        </div>
        {sent ? (
          <div className="py-12 text-center animate-in fade-in slide-in-from-bottom-4">
            <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6"><Check size={40} /></div>
            <h4 className="text-2xl font-bold mb-2">Message Sent!</h4>
            <p className="text-gray-500">Your inquiry has been successfully delivered to the artist.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex items-center space-x-2 text-emerald-800 font-bold text-xs uppercase tracking-widest mb-2 bg-emerald-50/50 w-fit px-3 py-1.5 rounded-lg border border-emerald-100">
              <AtSign size={14} /><span>To: {member.email}</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider ml-1">Your Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                  <input required type="text" placeholder="John Doe" className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-100 focus:ring-2 focus:ring-emerald-800 outline-none transition-all shadow-sm bg-gray-50/50" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider ml-1">Your Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                  <input required type="email" placeholder="john@example.com" className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-gray-100 focus:ring-2 focus:ring-emerald-800 outline-none transition-all shadow-sm bg-gray-50/50" />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider ml-1">Subject</label>
              <input required type="text" placeholder="Inquiry regarding your latest work" className="w-full px-4 py-3.5 rounded-xl border border-gray-100 focus:ring-2 focus:ring-emerald-800 outline-none transition-all shadow-sm bg-gray-50/50" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider ml-1">Your Message</label>
              <div className="relative">
                <MessageSquare className="absolute left-4 top-4 text-gray-300" size={16} />
                <textarea required rows={4} placeholder="Tell the artist about your interest..." className="w-full pl-11 pr-4 py-4 rounded-xl border border-gray-100 focus:ring-2 focus:ring-emerald-800 outline-none transition-all shadow-sm bg-gray-50/50 resize-none" />
              </div>
            </div>
            <button disabled={loading} type="submit" className="w-full bg-emerald-800 text-white py-4 rounded-2xl font-bold hover:bg-emerald-900 transition-all shadow-xl hover:shadow-emerald-900/30 flex items-center justify-center space-x-2 active:scale-[0.98]">
              {loading ? <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <><Send size={18} /><span>Send Direct Message</span></>}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

const ProfileView = ({ member, onBack }: { member: Member, onBack: () => void }) => {
  const [portfolioFilter, setPortfolioFilter] = useState('All');
  const [selectedWork, setSelectedWork] = useState<PortfolioItem | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  useEffect(() => {
    const originalTitle = document.title;
    const originalDescEl = document.querySelector('meta[name="description"]');
    const originalDesc = originalDescEl?.getAttribute('content') || "";
    const title = `${member.name} | ${member.category} Artist | SNA Lagos`;
    const description = `${member.name} is a professional ${member.category} artist based in ${member.location}. Member of the Society of Nigerian Artists since ${member.joinedDate}. ${member.bio.substring(0, 100)}...`;
    updateMetaTags(title, description, member.avatar);
    return () => {
      document.title = originalTitle;
      if (originalDescEl) originalDescEl.setAttribute('content', originalDesc);
    };
  }, [member]);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedWork(null);
        setIsShareModalOpen(false);
        setIsContactModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  useEffect(() => {
    if (selectedWork || isShareModalOpen || isContactModalOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [selectedWork, isShareModalOpen, isContactModalOpen]);

  const portfolioCategories = useMemo(() => {
    const cats = new Set(member.portfolio.map(item => item.category));
    return ['All', ...Array.from(cats)];
  }, [member]);

  const filteredPortfolio = useMemo(() => {
    if (portfolioFilter === 'All') return member.portfolio;
    return member.portfolio.filter(item => item.category === portfolioFilter);
  }, [member, portfolioFilter]);

  return (
    <div className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button onClick={onBack} className="flex items-center text-gray-500 hover:text-emerald-800 mb-8 font-semibold transition group">
          <ChevronRight size={20} className="rotate-180 mr-1 transition-transform group-hover:-translate-x-1" /> Back to Directory
        </button>
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <div className="sticky top-32">
              <div className="rounded-3xl overflow-hidden shadow-2xl mb-8">
                <img src={member.avatar} alt={member.name} loading="lazy" className="w-full h-[500px] object-cover" />
              </div>
              <div className="flex flex-col space-y-4">
                <div className="flex items-center space-x-2 text-gray-600"><Mail size={18} /><span>{member.email}</span></div>
                <div className="flex items-center space-x-2 text-gray-600"><MapPin size={18} /><span>{member.location}</span></div>
                <div className="flex items-center space-x-2 text-gray-600"><BookOpen size={18} /><span>Member since {member.joinedDate}</span></div>
                <div className="pt-6 flex flex-col space-y-4 border-t border-gray-100">
                  <div className="flex items-center space-x-6">
                    {member.socials?.instagram && <a href={member.socials.instagram} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-pink-600 transition-colors"><Instagram size={24} /></a>}
                    {member.socials?.twitter && <a href={member.socials.twitter} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors"><Twitter size={24} /></a>}
                    {member.socials?.website && <a href={member.socials.website} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-emerald-600 transition-colors"><Globe size={24} /></a>}
                    <button onClick={() => setIsShareModalOpen(true)} className="text-gray-400 hover:text-emerald-800 transition-colors ml-auto flex items-center space-x-2 font-bold text-xs uppercase tracking-widest"><Share2 size={18} /><span>Share</span></button>
                  </div>
                  <button onClick={() => setIsContactModalOpen(true)} className="w-full bg-emerald-800 text-white py-4 rounded-2xl font-bold flex items-center justify-center space-x-3 hover:bg-emerald-900 transition shadow-lg hover:shadow-emerald-900/20 active:scale-[0.98]"><Mail size={20} /><span>Contact Artist</span></button>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-8">
            <div className="mb-12">
              <span className="text-emerald-800 font-bold uppercase tracking-widest text-sm">{member.category}</span>
              <h1 className="text-5xl font-bold mt-2 mb-6 font-serif">{member.name}</h1>
              <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
                {member.bio}
                <p className="mt-4">In addition to his studio practice, {member.name.split(' ')[0]} is an active member of the Lagos art community, mentoring young artists and participating in local community mural projects. His philosophy centers on the idea that art should be accessible and reflective of the lived reality of Nigerians.</p>
              </div>
            </div>
            <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-4">
              <h2 className="text-3xl font-bold font-serif">Selected Works</h2>
              <div className="flex space-x-2 overflow-x-auto no-scrollbar pb-1">
                {portfolioCategories.map(cat => (
                  <button key={cat} onClick={() => setPortfolioFilter(cat)} className={`px-4 py-2 rounded-full text-xs font-bold transition whitespace-nowrap ${portfolioFilter === cat ? 'bg-emerald-800 text-white shadow-lg' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>{cat}</button>
                ))}
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-6 mb-20 animate-in fade-in duration-500">
              {filteredPortfolio.map((item, i) => (
                <div key={i} onClick={() => setSelectedWork(item)} className="group relative rounded-2xl overflow-hidden cursor-zoom-in aspect-square shadow-lg">
                  <img src={item.url} alt={item.title} loading="lazy" className="w-full h-full object-cover transition duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex flex-col items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="text-white font-bold text-lg mb-1">{item.title}</span>
                    <span className="text-emerald-200 text-xs uppercase tracking-widest font-bold">{item.category}</span>
                    <div className="mt-4 flex items-center text-white/90 text-sm font-semibold"><Eye size={18} className="mr-2" /> View Full</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <ShareModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} member={member} />
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} member={member} />
      {selectedWork && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-300" onClick={() => setSelectedWork(null)}>
          <button onClick={() => setSelectedWork(null)} className="absolute top-6 right-6 text-white/50 hover:text-white transition p-3 bg-white/10 rounded-full z-[110]"><X size={28} /></button>
          <div className="relative w-full h-full flex flex-col items-center justify-center gap-8" onClick={(e) => e.stopPropagation()}>
            <div className="w-full h-[75vh] flex items-center justify-center"><img src={selectedWork.url} alt={selectedWork.title} className="max-w-full max-h-full object-contain rounded-lg shadow-[0_0_50px_rgba(0,0,0,0.5)] animate-in zoom-in duration-300"/></div>
            <div className="text-center text-white animate-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-3xl md:text-4xl font-bold font-serif mb-2">{selectedWork.title}</h3>
              <p className="text-emerald-400 uppercase tracking-[0.2em] text-xs font-bold">{selectedWork.category}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const LoginView = ({ onLogin }: { onLogin: (user: any) => void }) => {
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      onLogin({ id: '1', name: 'Adekunle Olusegun', email: 'ade@art.ng' });
      setLoading(false);
    }, 1500);
  };
  const handleForgotPassword = () => alert("Please contact support at support@snalagos.ng to reset your password.");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20">
      <div className="max-w-md w-full p-8 bg-white rounded-[2.5rem] shadow-2xl transition-all duration-500 hover:shadow-emerald-900/10">
        <div className="text-center mb-10">
          <div className="w-16 h-16 art-gradient rounded-2xl mx-auto flex items-center justify-center text-white font-bold text-3xl mb-4 shadow-lg">S</div>
          <h2 className="text-3xl font-bold">Member Login</h2>
          <p className="text-gray-500 mt-2">Manage your profile and showcase your art.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="group">
            <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-emerald-800 transition-colors">Member Email</label>
            <input type="email" required className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:border-transparent transition-all duration-300 focus:scale-[1.02] shadow-sm" placeholder="e.g. artist@example.com"/>
          </div>
          <div className="group">
            <label className="block text-sm font-semibold text-gray-700 mb-2 group-focus-within:text-emerald-800 transition-colors">Password</label>
            <input type="password" required className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:border-transparent transition-all duration-300 focus:scale-[1.02] shadow-sm" placeholder="••••••••"/>
          </div>
          <div>
            <button type="submit" disabled={loading} className="w-full bg-emerald-800 text-white py-4 rounded-xl font-bold hover:bg-emerald-900 transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-emerald-900/30 hover:scale-[1.02] active:scale-[0.98]">
              {loading ? <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : 'Sign In'}
            </button>
            <div className="mt-4 text-center">
              <button type="button" onClick={handleForgotPassword} className="text-xs font-bold text-emerald-800 hover:text-emerald-900 transition-colors underline underline-offset-4">Forgot Password?</button>
            </div>
          </div>
        </form>
        <div className="mt-8 text-center text-sm"><span className="text-gray-500">Not a member yet?</span><button className="ml-2 text-emerald-800 font-bold hover:underline transition-colors">Apply for Membership</button></div>
      </div>
    </div>
  );
};

const DashboardView = ({ user, onEdit }: { user: any, onEdit: () => void }) => (
  <div className="pt-32 pb-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-emerald-800 rounded-[3rem] p-12 text-white mb-12 flex flex-col md:flex-row justify-between items-center gap-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-2">Welcome, {user.name}</h1>
          <p className="text-emerald-100 opacity-80 font-medium">Lagos Chapter Professional Member • Since 2018</p>
        </div>
        <button onClick={onEdit} className="relative z-10 bg-white text-emerald-800 px-8 py-4 rounded-2xl font-bold hover:bg-emerald-50 transition-all duration-300 hover:scale-[1.05] shadow-lg active:scale-95">Edit Profile Information</button>
      </div>
      <div className="grid md:grid-cols-4 gap-8">
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
          <div className="w-14 h-14 bg-emerald-50 text-emerald-800 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110"><TrendingUp size={28} /></div>
          <h3 className="text-4xl font-bold mb-1">15,742</h3>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Lifetime Profile Views</p>
          <div className="mt-4 flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 w-fit px-2 py-1 rounded-lg">Since joining in 2018</div>
        </div>
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
          <div className="w-14 h-14 bg-purple-50 text-purple-800 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110"><BarChart3 size={28} /></div>
          <h3 className="text-4xl font-bold mb-1">124</h3>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Profile Views Today</p>
          <div className="mt-4 flex items-center text-xs font-bold text-purple-600 bg-purple-50 w-fit px-2 py-1 rounded-lg">↑ 5% from yesterday</div>
        </div>
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
          <div className="w-14 h-14 bg-blue-50 text-blue-800 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110"><Mail size={28} /></div>
          <h3 className="text-4xl font-bold mb-1">12</h3>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Inquiries & Commissions</p>
          <div className="mt-4 flex items-center text-xs font-bold text-blue-600 bg-blue-50 w-fit px-2 py-1 rounded-lg">8 new messages</div>
        </div>
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
          <div className="w-14 h-14 bg-amber-50 text-amber-800 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110"><Award size={28} /></div>
          <h3 className="text-4xl font-bold mb-1">3</h3>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Active Exhibitions</p>
          <div className="mt-4 flex items-center text-xs font-bold text-amber-600 bg-amber-50 w-fit px-2 py-1 rounded-lg">Nike Art Gallery + 2 more</div>
        </div>
      </div>
    </div>
  </div>
);

const EditProfileView = ({ user, onBack }: { user: any, onBack: () => void }) => {
  const [saving, setSaving] = useState(false);
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      onBack();
    }, 1000);
  };

  return (
    <div className="pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button onClick={onBack} className="flex items-center text-gray-500 hover:text-emerald-800 mb-8 font-semibold transition group"><ArrowLeft size={20} className="mr-2 transition-transform group-hover:-translate-x-1" /> Back to Dashboard</button>
        <div className="bg-white rounded-[2.5rem] p-10 shadow-xl border border-gray-100">
          <SectionHeading title="Edit Profile Details" subtitle="Update your professional information and portfolio to attract collectors." />
          <form onSubmit={handleSave} className="space-y-8 mt-12">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Full Professional Name</label>
                <input type="text" defaultValue={user.name} className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-800 focus:outline-none transition-all shadow-sm"/>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Primary Category</label>
                <select className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-800 focus:outline-none transition-all shadow-sm bg-white">
                  {CATEGORIES.map(cat => <option key={cat}>{cat}</option>)}
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Artist Statement / Bio</label>
              <textarea rows={6} className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-800 focus:outline-none transition-all shadow-sm" placeholder="Write about your artistic journey..."></textarea>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Public Contact Email</label>
                <input type="email" defaultValue={user.email} className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-800 focus:outline-none transition-all shadow-sm"/>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Studio Location</label>
                <input type="text" placeholder="e.g. Victoria Island, Lagos" className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-800 focus:outline-none transition-all shadow-sm"/>
              </div>
            </div>
            <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
              <button type="button" onClick={onBack} className="text-gray-500 font-bold hover:text-gray-800 transition-colors">Cancel Changes</button>
              <button type="submit" disabled={saving} className="bg-emerald-800 text-white px-10 py-4 rounded-xl font-bold flex items-center space-x-2 shadow-lg hover:bg-emerald-900 transition-all hover:scale-105 active:scale-95">
                {saving ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <><Save size={18} /><span>Save Profile Changes</span></>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// --- Mission & Vision Component ---
const MissionVision = () => (
  <section className="py-24 bg-white overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-2 gap-12">
        <div className="bg-emerald-800 text-white p-12 rounded-[3rem] relative overflow-hidden shadow-2xl group">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-white/5 rounded-full blur-2xl group-hover:scale-110 transition-transform"></div>
          <Award size={40} className="text-emerald-300 mb-6" />
          <h3 className="text-3xl font-bold mb-4 font-serif">Our Mission</h3>
          <p className="text-emerald-100/90 leading-relaxed font-medium">
            To build a sustainable ecosystem for Nigerian artists through professional connection, global advocacy, and technical excellence.
          </p>
        </div>
        <div className="bg-emerald-50 text-emerald-900 p-12 rounded-[3rem] relative overflow-hidden shadow-lg border border-emerald-100 group">
          <Eye size={40} className="text-emerald-800 mb-6" />
          <h3 className="text-3xl font-bold mb-4 font-serif">Our Vision</h3>
          <p className="text-emerald-800/80 leading-relaxed font-medium">
            To establish Lagos as the definitive global capital of contemporary African art, bridging tradition with the future.
          </p>
        </div>
      </div>
    </div>
  </section>
);

// --- Main App ---

const App = () => {
  const [view, setView] = useState<'home' | 'directory' | 'profile' | 'login' | 'dashboard' | 'about' | 'edit-profile'>('home');
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('sna_user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  useEffect(() => {
    if (view !== 'profile') {
      updateMetaTags(
        'SNA Lagos - Society of Nigerian Artists',
        'Official directory and platform for professional visual artists in the Lagos Chapter of the Society of Nigerian Artists.'
      );
    }
  }, [view]);

  const handleLogin = (userData: any) => {
    setUser(userData);
    localStorage.setItem('sna_user', JSON.stringify(userData));
    setView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('sna_user');
    setView('home');
  };

  const handleSelectMember = (member: Member) => {
    setSelectedMember(member);
    setView('profile');
    window.scrollTo(0,0);
  };

  const renderContent = () => {
    switch (view) {
      case 'home':
        return (
          <div className="animate-in fade-in duration-700">
            <Hero onExplore={() => setView('directory')} />
            
            <ArtMarquee />

            <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                <SectionHeading title="Masters & Rising Stars" subtitle="Highlighting the professional members of the Lagos Chapter who are defining the contemporary narrative." />
                <button onClick={() => setView('directory')} className="hidden md:flex items-center text-emerald-800 font-bold mb-12 hover:translate-x-1 transition group">
                  View Full Directory <ChevronRight className="ml-1 group-hover:translate-x-1" />
                </button>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
                {MOCK_MEMBERS.filter(m => m.featured).slice(0, 3).map(member => (
                  <MemberCard key={member.id} member={member} onClick={() => handleSelectMember(member)} />
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
                  <h3 className="text-4xl md:text-5xl font-bold mb-6 font-serif">The Collector's Circle</h3>
                  <p className="text-lg text-emerald-100/70 mb-12 leading-relaxed">
                    Subscribe to our curated monthly newsletter for early access to private viewings, 
                    artist studio visits, and exclusive collection opportunities.
                  </p>
                  <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto" onSubmit={(e) => e.preventDefault()}>
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
      case 'directory':
        return <DirectoryView members={MOCK_MEMBERS} onSelectMember={handleSelectMember} />;
      case 'profile':
        return selectedMember ? <ProfileView member={selectedMember} onBack={() => setView('directory')} /> : null;
      case 'login':
        return <LoginView onLogin={handleLogin} />;
      case 'dashboard':
        return user ? <DashboardView user={user} onEdit={() => setView('edit-profile')} /> : <LoginView onLogin={handleLogin} />;
      case 'edit-profile':
        return user ? <EditProfileView user={user} onBack={() => setView('dashboard')} /> : <LoginView onLogin={handleLogin} />;
      case 'about':
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
                    Founded during the dawn of independence, the Society of Nigerian Artists has consistently championed the cultural significance of visual arts, ensuring that the Nigerian narrative is preserved and celebrated globally.
                  </p>
                  <div className="flex space-x-4">
                    <div className="flex -space-x-3">
                      {MOCK_MEMBERS.map(m => (
                        <img key={m.id} src={m.avatar} className="w-10 h-10 rounded-full border-2 border-white object-cover" alt="Artist" />
                      ))}
                    </div>
                    <p className="text-sm font-bold text-gray-500 flex items-center">
                      <Users size={16} className="mr-2" /> 500+ Active Members in Lagos
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
                      <p className="text-emerald-800 font-bold text-lg mb-2 italic font-serif">"Art is the only way to run away without leaving home."</p>
                      <p className="text-gray-400 text-[10px] uppercase tracking-widest font-bold">— Society Proverb</p>
                   </div>
                </div>
              </div>
            </div>

            {/* Core Values Section */}
            <section className="bg-gray-50 py-24 mb-24">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeading title="Our Core Pillars" subtitle="The values that guide every stroke of our collective brush." centered />
                <div className="grid md:grid-cols-4 gap-8">
                  {[
                    { icon: <ShieldCheck />, title: "Excellence", desc: "Upholding the highest professional standards in artistry and curation." },
                    { icon: <History />, title: "Heritage", desc: "Preserving indigenous techniques like Adire and Nok-inspired sculpture." },
                    { icon: <Sparkles />, title: "Innovation", desc: "Leading the charge in NFT, digital transformation, and experimental media." },
                    { icon: <Heart />, title: "Community", desc: "Fostering mentorship and collaborative mural projects across Lagos." }
                  ].map((val, i) => (
                    <div key={i} className="bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-2 border border-gray-100">
                      <div className="w-16 h-16 bg-emerald-50 text-emerald-800 rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:rotate-12 group-hover:scale-110">
                        {React.cloneElement(val.icon as React.ReactElement, { size: 32 })}
                      </div>
                      <h4 className="text-2xl font-bold mb-4 font-serif">{val.title}</h4>
                      <p className="text-gray-500 leading-relaxed text-sm">{val.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Detailed Mission & Vision Blocks */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
              <div className="grid md:grid-cols-2 gap-12">
                <div className="bg-emerald-800 text-white p-16 rounded-[3.5rem] relative overflow-hidden group shadow-2xl">
                   <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/5 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700"></div>
                   <Award size={48} className="text-emerald-300 mb-8" />
                   <h3 className="text-4xl font-bold mb-6 font-serif">The Mission</h3>
                   <p className="text-lg text-emerald-100 leading-relaxed opacity-90 font-medium">
                     To cultivate a resilient ecosystem for visual artists in Lagos. We provide the structural support needed for world-class exhibitions, continuous professional development, and legal advocacy, ensuring our members compete on the global stage.
                   </p>
                </div>
                <div className="bg-white border-2 border-emerald-800/10 p-16 rounded-[3.5rem] relative overflow-hidden group shadow-lg">
                   <Eye size={48} className="text-emerald-800 mb-8" />
                   <h3 className="text-4xl font-bold mb-6 font-serif text-emerald-900">The Vision</h3>
                   <p className="text-lg text-gray-600 leading-relaxed font-medium">
                     To transform Lagos into the definitive global hub for contemporary African art. We envision a future where tradition and modern innovation coexist, creating a legacy where every Nigerian artist can monetize their craft and thrive sustainably.
                   </p>
                </div>
              </div>
            </div>

            {/* Executive Leadership Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center space-x-3 mb-12">
                <div className="w-12 h-12 bg-emerald-800 rounded-xl flex items-center justify-center text-white shadow-lg">
                  <Users size={24} />
                </div>
                <div>
                  <h3 className="text-3xl font-bold font-serif">Executive Council</h3>
                  <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Leadership 2024 - 2026</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
                {LEADERSHIP_TEAM.map((leader, idx) => (
                  <div key={idx} className="group">
                    <div className="relative mb-8">
                      <div className="aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-xl border border-gray-100">
                        <img src={leader.image} alt={leader.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                           <p className="text-sm text-emerald-50 leading-relaxed italic">{leader.bio}</p>
                        </div>
                      </div>
                    </div>
                    <h4 className="text-2xl font-bold font-serif mb-1 text-gray-900">{leader.name}</h4>
                    <p className="text-emerald-800 font-bold text-xs uppercase tracking-[0.2em]">{leader.role}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Final CTA */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-32">
              <div className="bg-emerald-950 rounded-[4rem] p-16 text-center text-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-10"></div>
                <div className="relative z-10">
                  <h3 className="text-4xl md:text-5xl font-bold mb-6 font-serif">Become Part of the Legacy</h3>
                  <p className="text-xl text-emerald-100/80 mb-10 max-w-2xl mx-auto font-medium">
                    Whether you are an established master or a rising star, SNA Lagos offers the community and platform you need to excel.
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center gap-6">
                    <button className="bg-white text-emerald-900 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-emerald-50 transition-all shadow-xl hover:scale-105 active:scale-95">Apply for Membership</button>
                    <button className="border-2 border-white/20 bg-white/5 backdrop-blur-md text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all shadow-xl hover:scale-105 active:scale-95">Contact Secretariat</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return <div>404</div>;
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar activeView={view} setView={setView} user={user} onLogout={handleLogout} />
      <main className="transition-all duration-300">
        {renderContent()}
      </main>
      
      <footer className="bg-gray-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-16">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-8">
                <div className="w-10 h-10 art-gradient rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">S</div>
                <span className="text-2xl font-bold tracking-tight font-serif uppercase">SNA LAGOS</span>
              </div>
              <p className="text-gray-400 max-w-sm text-lg leading-relaxed mb-10">
                Empowering Nigerian artists through professional connection, legal advocacy, and global exhibitions since 1963.
              </p>
              <div className="flex space-x-6">
                 <a href="https://instagram.com/snalagos" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition-all transform hover:-translate-y-1"><Instagram size={24} /></a>
                 <a href="https://twitter.com/snalagos" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition-all transform hover:-translate-y-1"><Twitter size={24} /></a>
                 <a href="https://snalagos.ng" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition-all transform hover:-translate-y-1"><Globe size={24} /></a>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-8 font-serif text-lg">Ecosystem</h4>
              <ul className="space-y-4 text-gray-400 font-medium">
                <li><button onClick={() => setView('directory')} className="hover:text-white transition-colors">Artist Directory</button></li>
                <li><button onClick={() => setView('about')} className="hover:text-white transition-colors">Our Heritage</button></li>
                <li><button className="hover:text-white transition-colors">Membership Guide</button></li>
                <li><button className="hover:text-white transition-colors">Juried Exhibitions</button></li>
                <li><button className="hover:text-white transition-colors">Legal Advocacy</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-8 font-serif text-lg">Contact Us</h4>
              <ul className="space-y-6 text-gray-400 font-medium">
                <li className="flex items-start">
                  <MapPin size={20} className="mr-3 text-emerald-700 shrink-0" />
                  <span>National Theatre Complex, Iganmu, Lagos State.</span>
                </li>
                <li className="flex items-center">
                  <Mail size={20} className="mr-3 text-emerald-700 shrink-0" />
                  <span>info@snalagos.ng</span>
                </li>
                <li className="flex items-center">
                  <Globe size={20} className="mr-3 text-emerald-700 shrink-0" />
                  <span>www.snalagos.ng</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-24 pt-8 border-t border-gray-800/50 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em]">
            <span>© {new Date().getFullYear()} Society of Nigerian Artists (Lagos Chapter).</span>
            <div className="flex space-x-8">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Membership</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(<App />);
}

import { SectionHeading } from "./SectionHeading";
import { ChevronRight, Calendar, Clock, MapPin } from "lucide-react";


export const UpcomingEvents = () => {
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
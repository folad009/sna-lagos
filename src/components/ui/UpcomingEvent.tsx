import { SectionHeading } from "./SectionHeading";
import { ChevronRight, Calendar, Clock, MapPin, RefreshCw } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { getUpcomingEvents } from "@/src/api/wordpress";
import { UpcomingEvent } from "@/src/types";

export const UpcomingEvents = () => {
  const [events, setEvents] = useState<UpcomingEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Prevent double fetch in React Strict Mode
  const fetchedRef = useRef(false);

  /**
   * Async function to load upcoming events.
   * Fetch data from the API and update events state.
   * Handles loading/error states via setLoading and setError.
   */
  const loadEvents = async () => {
    try {
      setLoading(true);
      setError(false);
      const data = await getUpcomingEvents();
      setEvents(data || []);
    } catch (e) {
      console.error("Failed to load events", e);
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  
  /**
   * Retry handler: resets fetchedRef to allow re-fetching and calls loadEvents.
   */
  const handleRetry = () => {
    fetchedRef.current = false;
    loadEvents();
  };

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;
    loadEvents();
  }, []);

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <SectionHeading
            title="Society Calendar"
            subtitle="Join us at our upcoming events, exhibitions, and professional workshops across Lagos."
          />
          <button className="hidden md:flex items-center text-[#bb6e31] font-bold mb-12 hover:translate-x-1 transition group">
            Full Calendar
            <ChevronRight className="ml-1 group-hover:translate-x-1" />
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-16 text-gray-400 font-semibold">
            Loading upcoming events...
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="text-center py-16">
            <p className="text-red-500 font-semibold mb-4">
              Unable to load events. Please try again later.
            </p>
            <button 
              onClick={handleRetry}
              className="inline-flex items-center gap-2 py-2 px-4 bg-[#bb6e31] text-white font-bold rounded-lg hover:bg-[#a55f29] transition"
            >
              <RefreshCw size={18} />
              Retry
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && events.length === 0 && (
          <div className="text-center py-16 text-gray-400 font-semibold">
            No upcoming events at the moment.
          </div>
        )}

        {/* Events Grid */}
        {!loading && !error && events.length > 0 && (
          <div className="grid md:grid-cols-3 gap-8">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 bg-[#bb6e31]/10 text-[#bb6e31] rounded-xl flex items-center justify-center transition-transform group-hover:scale-110">
                    <Calendar size={24} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-gray-100 text-gray-500 rounded-full">
                    {event.category}
                  </span>
                </div>

                <h4 className="text-2xl font-bold mb-4 font-serif leading-tight">
                  {event.title}
                </h4>

                <div className="space-y-2 mb-8 text-sm text-gray-500">
                  <p className="flex items-center">
                    <Clock size={16} className="mr-2 text-[#bb6e31]" />
                    {event.date}
                  </p>
                  <p className="flex items-center">
                    <MapPin size={16} className="mr-2 text-[#bb6e31]" />
                    {event.location}
                  </p>
                </div>

                {event.registrationLink ? (
                  <a
                    href={event.registrationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block w-full py-4 rounded-xl border border-[#bb6e31]/10 font-bold text-[#bb6e31] group-hover:bg-[#bb6e31] group-hover:text-white transition-all text-center"
                    aria-label={`Register interest for ${event.title}`}
                  >
                    Register Interest
                  </a>
                ) : (
                  <button
                    disabled
                    className="w-full py-4 rounded-xl border border-[#bb6e31]/10 font-bold text-[#bb6e31] opacity-50 cursor-not-allowed"
                    aria-disabled="true"
                    title="Registration link is not available"
                  >
                    Register Interest
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
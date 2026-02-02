import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getEvents } from "../api/events.api";
import Loading from "../components/ui/Loading";
import { FiCalendar, FiMapPin, FiClock } from "react-icons/fi";
import { getImageUrl } from "../utils/imageUtils";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const data = await getEvents();
        setEvents(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError("Failed to load events.");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="container-x mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-green-600 font-semibold mb-2 uppercase tracking-wider">
            Community & Conferences
          </p>
          <h1 className="text-4xl font-bold font-josefin mb-4">Upcoming Events</h1>
          <p className="text-gray-600">
            Join us at crypto conferences and mining meetups around the world.
          </p>
        </div>

        {error ? (
          <div className="text-center text-red-500 py-10">{error}</div>
        ) : events.length === 0 ? (
          <div className="text-center text-gray-500 py-20 italic">
            No upcoming events found. Stay tuned!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <Link
                key={event.id}
                to={`/events/${event.slug}`}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col h-full"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={getImageUrl(event.image)}
                    alt={event.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wide">
                    {new Date(event.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold mb-3 font-josefin group-hover:text-green-600 transition-colors line-clamp-2">
                    {event.title}
                  </h3>
                  
                  <div className="space-y-2 mb-4 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <FiCalendar className="text-green-500" />
                      <span>
                        {new Date(event.date).toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    {event.location && (
                      <div className="flex items-center gap-2">
                        <FiMapPin className="text-green-500" />
                        <span className="truncate">{event.location}</span>
                      </div>
                    )}
                  </div>

                  <p className="text-gray-600 text-sm line-clamp-3 mb-6 flex-grow">
                     {event.short_description || event.description?.substring(0, 100) + "..."}
                  </p>

                  <span className="text-green-600 font-semibold text-sm group-hover:underline">
                    Read More →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsPage;

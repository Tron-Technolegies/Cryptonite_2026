import React, { useState, useEffect } from "react";
import { FiCalendar, FiMapPin } from "react-icons/fi";
import { Link } from "react-router-dom";
import { getEvents } from "../../api/events.api";
import SectionHeading from "../ui/SectionHeading";
import { getImageUrl } from "../../utils/imageUtils";

const EventsSection = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const data = await getEvents();
      // Ensure we have an array and take exactly 2
      const eventList = Array.isArray(data) ? data : [];
      setEvents(eventList.slice(0, 3));
    } catch (error) {
      console.error("Failed to load events:", error);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  if(!loading && events.length === 0) return null;

  return (
    <section className="bg-white container-x py-20 px-6 md:px-16">
      {/* HEADER */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl josefin-sans font-extrabold text-black uppercase tracking-wide">
          Upcoming <SectionHeading>Events</SectionHeading>
        </h2>
        <p className="text-gray-500 mt-3">
          Join us at our upcoming mining conferences and workshops
        </p>
      </div>

      {/* EVENT CARDS */}
      <div className="grid gap-10 md:grid-cols-3">
        {events.slice(0, 3).map((event, index) => (
          <div
            key={event.id || index}
            className="border border-gray-200 bg-white rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden group"
          >
            {/* IMAGE */}
            <div className="relative">
              <img
                src={getImageUrl(event.thumbnail)}
                alt={event.title}
                className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
              />
               <span className="absolute top-3 left-3 bg-white/90 text-black text-xs font-semibold px-3 py-1 rounded-md shadow">
                Event
              </span>
              <div className="absolute top-3 right-3 text-white text-xl opacity-80 bg-black/20 p-1 rounded-full">
                 <FiCalendar />
              </div>
            </div>

            {/* CONTENT */}
            <div className="p-6">
              <h3 className="text-lg font-semibold text-black leading-snug mb-3 line-clamp-2 min-h-[3.5rem]">
                {event.title}
              </h3>

              <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                 {event.date || event.created_at ? (
                    <>
                    <FiCalendar className="text-(--primary-color)" />
                    <span>{new Date(event.date || event.created_at).toLocaleDateString()}</span>
                    </>
                 ) : null}
                 {event.location && (
                    <>
                    <span className="mx-1">•</span>
                    <FiMapPin className="text-(--primary-color)" />
                    <span className="truncate max-w-[100px]">{event.location}</span>
                    </>
                 )}
              </div>

              <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4 h-[4.5em]">
                {event.description || event.short_description || event.paragraph_1}
              </p>

              {/* BUTTON */}
              <Link to={`/events/${event.slug || event.id}`} className="mt-auto inline-block text-(--primary-color) font-semibold text-sm hover:underline">
                 Event Details →
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* VIEW ALL BUTTON */}
      <div className="text-center mt-12">
        <Link to="/events">
          <button className="bg-(--primary-color) text-white font-semibold px-8 py-3 rounded-lg hover:brightness-110 transition shadow-lg hover:shadow-xl cursor-pointer">
            View All Events
          </button>
        </Link>
      </div>
    </section>
  );
};

export default EventsSection;

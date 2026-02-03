import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getEvent } from "../api/events.api";
import Loading from "../components/ui/Loading";
import { FiArrowLeft, FiCalendar, FiMapPin, FiClock, FiShare2 } from "react-icons/fi";
import { getImageUrl } from "../utils/imageUtils";

const EventDetailsPage = () => {
  const { slug } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchEvent = async () => {
      try {
        const data = await getEvent(slug);
        setEvent(data);
      } catch (err) {
        setError("Failed to load event details.");
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [slug]);

  if (loading) return <Loading />;

  if (error || !event) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-red-500">
        <p className="mb-4">{error || "Event not found"}</p>
        <Link to="/events" className="underline text-green-600">
          Back to Events
        </Link>
      </div>
    );
  }

  const paragraphs = [
    event.paragraph_1,
    event.paragraph_2,
    event.paragraph_3,
    event.paragraph_4,
    event.paragraph_5,
  ].filter(Boolean);

  const images = [event.image_1, event.image_2, event.image_3, event.image_4, event.image_5].filter(
    Boolean,
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* HERO SECTION */}
      <div className="relative h-[50vh] min-h-[400px]">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={getImageUrl(event.thumbnail)}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" /> {/* Dark Overlay */}
        </div>

        {/* Hero Content */}
        <div className="relative container mx-auto px-6 h-full flex flex-col justify-end pb-12">
          <Link
            to="/events"
            className="inline-flex items-center text-white/80 hover:text-white transition-colors mb-6 group w-fit"
          >
            <FiArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Events
          </Link>

          <div className="max-w-4xl">
            <span className="inline-block px-3 py-1 bg-green-600/90 text-white text-xs font-bold rounded-full mb-4 uppercase tracking-wider backdrop-blur-sm">
              Event
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {event.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-white/90">
              <div className="flex items-center gap-2">
                <FiCalendar className="text-green-400" />
                <span>
                  {new Date(event.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <span className="hidden md:inline text-white/40">•</span>
              <div className="flex items-center gap-2">
                <span className="text-sm border border-white/30 rounded-full px-3 py-0.5">
                  {event.author_name || "Admin"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT GRID */}
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* LEFT: Main Content (2/3) */}
          <div className="w-full lg:w-2/3 space-y-12">
            {/* Description Paragraphs */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 border-l-4 border-green-500 pl-4">
                About the Event
              </h2>
              <div className="prose prose-lg text-gray-700 max-w-none">
                {paragraphs.map((text, index) => (
                  <p key={index} className="leading-relaxed whitespace-pre-line">
                    {text}
                  </p>
                ))}
              </div>
            </div>

            {/* Gallery */}
            {images.length > 0 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 border-l-4 border-green-500 pl-4">
                  Event Gallery
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {images.map((img, idx) => (
                    <div key={idx} className="group overflow-hidden rounded-xl shadow-sm hover:shadow-md transition-shadow">
                      <img
                        src={getImageUrl(img)}
                        alt={`Gallery ${idx + 1}`}
                        className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: Sidebar (1/3) */}
          <div className="w-full lg:w-1/3">
            <div className="sticky top-24 space-y-8">
              
              {/* Event Info Card */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="bg-gray-900 p-6">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                   <FiClock className="text-green-400"/> Event Details
                  </h3>
                </div>
                <div className="p-8 space-y-6">
                  {/* Short Description (Logistics) */}
                  <div className="text-gray-700 leading-relaxed whitespace-pre-line border-b border-gray-100 pb-6">
                    {event.short_description}
                  </div>

                  {/* Actions */}
                  {/* <div className="space-y-3">
                    <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-green-600/30 transform hover:-translate-y-0.5">
                      Register Now
                    </button>
                    <button className="w-full bg-white border border-gray-200 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                      <FiShare2 /> Share Event
                    </button>
                  </div> */}
                </div>
              </div>

              {/* Author / Contact Card */}
              {/* <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-2xl">
                  👨‍💻
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold">Organized by</p>
                  <p className="font-bold text-gray-900">{event.author_name || "Cryptonite Admin"}</p>
                </div>
              </div> */}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;

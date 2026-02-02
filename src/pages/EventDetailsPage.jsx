import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getEvent } from "../api/events.api";
import Loading from "../components/ui/Loading";
import { FiArrowLeft, FiCalendar } from "react-icons/fi";
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
    <div className="min-h-screen bg-white pb-20">
      {/* HERO */}
      <div className="relative h-[420px]">
        <img
          src={getImageUrl(event.thumbnail)}
          alt={event.title}
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-green-600 via-green-600/40 to-transparent" />

        <div className="relative max-w-6xl mx-auto px-6 h-full flex flex-col justify-end pb-14">
          <Link
            to="/events"
            className="text-white/80 hover:text-white flex items-center gap-2 mb-6"
          >
            <FiArrowLeft /> Back to Events
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">{event.title}</h1>

          <div className="flex items-center gap-2 text-green-200">
            <FiCalendar />
            <span>
              {new Date(event.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-6 -mt-12 relative z-10">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 space-y-8">
          {/* Description */}
          {paragraphs.map((text, index) => (
            <p key={index} className="text-gray-700 leading-relaxed text-lg">
              {text}
            </p>
          ))}

          {/* Optional Images */}
          {images.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={getImageUrl(img)}
                  alt={`Event ${idx + 1}`}
                  className="rounded-xl shadow-md object-cover w-full h-64"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;

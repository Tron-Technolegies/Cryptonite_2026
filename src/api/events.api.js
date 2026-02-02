import api from "./api";

// Fetch all events
export const getEvents = async () => {
  try {
    const response = await api.get("/events/");
    return response.data;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

// Fetch single event by slug
export const getEvent = async (slug) => {
  try {
    const response = await api.get(`/events/${slug}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching event ${slug}:`, error);
    throw error;
  }
};

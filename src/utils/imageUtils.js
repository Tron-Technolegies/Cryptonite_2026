const CLOUDINARY_BASE = "https://res.cloudinary.com/dfe8yna1k/image/upload/";

// Extract protocol + domain from API Base URL (e.g., https://api.cryptonite.at)
const getApiBase = () => {
  try {
    const url = new URL(import.meta.env.VITE_API_BASE_URL);
    return url.origin; // Returns "https://api.cryptonite.at"
  } catch (e) {
    return "";
  }
};

const API_BASE = getApiBase();

export const getImageUrl = (image) => {
  if (!image) return "";

  // Case 1: already a full URL (media or cloudinary)
  if (typeof image === "string" && image.startsWith("http")) {
    return image;
  }

  // Case 2: cloudinary relative path (image/upload/...)
  if (typeof image === "string" && image.startsWith("image/upload")) {
    return CLOUDINARY_BASE + image.replace("image/upload/", "");
  }

  // Case 3: image object with url
  if (typeof image === "object" && image.url) {
    return image.url;
  }

  // Case 4: local relative path (starts with /) - Prepend Backend URL
  if (typeof image === "string" && image.startsWith("/")) {
    return API_BASE + image;
  }

  // Case 5: other strings - return as is
  if (typeof image === "string" && image.length > 0) {
      return image;
  }

  return "";
};

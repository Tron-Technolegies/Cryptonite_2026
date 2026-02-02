const CLOUDINARY_BASE = "https://res.cloudinary.com/dfe8yna1k/image/upload/";

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

  return "";
};

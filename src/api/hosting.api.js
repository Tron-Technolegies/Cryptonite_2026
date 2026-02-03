import api from "./api";

// Create a hosting request before payment
export const createHostingRequest = async (data) => {
  try {
    const response = await api.post("/hosting/create/", data);
    return response.data;
  } catch (error) {
    console.error("Error creating hosting request:", error);
    throw error;
  }
};

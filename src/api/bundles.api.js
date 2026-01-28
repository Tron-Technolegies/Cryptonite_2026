import api from "./api";

// Fetch all bundle offers
export const getBundles = async () => {
  try {
    const response = await api.get("/bundles/");
    return response.data;
  } catch (error) {
    console.error("Error fetching bundles:", error);
    throw error;
  }
};

// Fetch single bundle by ID
export const getBundle = async (id) => {
  try {
    const response = await api.get(`/bundles/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching bundle ${id}:`, error);
    throw error;
  }
};

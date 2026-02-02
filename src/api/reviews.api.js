import api from "./api";

// Fetch reviews for a specific product
export const getProductReviews = async (productId) => {
  try {
    const response = await api.get(`/products/${productId}/reviews/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching reviews for product ${productId}:`, error);
    throw error;
  }
};

// Create a new review for a product
export const createReview = async (productId, data) => {
  try {
    const response = await api.post(`/products/${productId}/reviews/create/`, data);
    return response.data;
  } catch (error) {
    console.error(`Error creating review for product ${productId}:`, error);
    throw error;
  }
};

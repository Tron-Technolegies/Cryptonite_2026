import api from "./api";

// Create Stripe Payment Intent
export const createPaymentIntent = async (data) => {
  try {
    const response = await api.post("/payments/create-intent/", data);
    return response.data;
  } catch (error) {
    console.error("Error creating payment intent:", error);
    throw error;
  }
};

// Get checkout summary (cart totals)
export const getCheckoutSummary = async () => {
  try {
    const response = await api.get("/checkout/");
    return response.data;
  } catch (error) {
    console.error("Error fetching checkout summary:", error);
    throw error;
  }
};

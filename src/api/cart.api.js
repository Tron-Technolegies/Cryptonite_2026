import api from "./api";

// Fetch all cart items
export const getCart = async () => {
    try {
        const response = await api.get("/cart/");
        return response.data;
    } catch (error) {
        console.error("Error fetching cart:", error);
        throw error;
    }
};

// Add product or bundle to cart
export const addToCart = async (productId, bundleId, quantity = 1) => {
    try {
        const payload = {};
        if (productId) payload.product_id = productId;
        if (bundleId) payload.bundle_id = bundleId;
        payload.quantity = quantity;

        const response = await api.post("/cart/add/", payload);
        return response.data;
    } catch (error) {
        console.error("Error adding to cart:", error);
        throw error;
    }
};

// Update cart item quantity
export const updateCartItem = async (itemId, quantity) => {
    try {
        const response = await api.patch(`/cart/update/${itemId}/`, { quantity });
        return response.data;
    } catch (error) {
        console.error("Error updating cart item:", error);
        throw error;
    }
};

// Remove item from cart
export const removeFromCart = async (itemId) => {
    try {
        const response = await api.delete(`/cart/remove/${itemId}/`);
        return response.data;
    } catch (error) {
        console.error("Error removing from cart:", error);
        throw error;
    }
};

// Get cart total (optional if /checkout provides it)
export const getCartTotal = async () => {
    try {
        const response = await api.get("/cart/total/");
        return response.data;
    } catch (error) {
        console.error("Error fetching cart total:", error);
        throw error;
    }
};

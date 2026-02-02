import api from "./api";

// Submit a rental request
export const rentMiner = async (data) => {
    try {
        const response = await api.post("/rent/", data);
        return response.data;
    } catch (error) {
        console.error("Error renting miner:", error);
        throw error;
    }
};

// Fetch user's active rentals
export const getActiveRentals = async () => {
    try {
        const response = await api.get("/rent/active/");
        return response.data;
    } catch (error) {
        console.error("Error fetching active rentals:", error);
        throw error;
    }
};

// Fetch user's rental history
export const getRentalHistory = async () => {
    try {
        const response = await api.get("/rent/history/");
        return response.data;
    } catch (error) {
        console.error("Error fetching rental history:", error);
        throw error;
    }
};

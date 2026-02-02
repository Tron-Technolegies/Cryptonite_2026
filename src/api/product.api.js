import api from "./api";

export const getProducts = async (params = {}) => {
  const response = await api.get("/products/", { params });
  return response.data;
};

export const getProduct = (id) => api.get(`/products/${id}/`);

export const getProductsByCoin = (coin) =>
  api.get(`/products/?supported_coin=${coin}&is_available=true`);

import api from "./api";

export const getProducts = async (queryString = "") => {
  return api.get(`/products/?${queryString}`);
};

export const getProduct = (id) => api.get(`/products/${id}/`);

export const getProductsByCoin = (coin) =>
  api.get(`/products/?supported_coin=${coin}&is_available=true`);

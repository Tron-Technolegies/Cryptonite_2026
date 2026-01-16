import api from "./api";

export const getProductsByCoin = (coin) =>
  api.get(`/products/?supported_coin=${coin}&is_available=true`);

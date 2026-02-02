import api from "./api";

export const forceLogout = () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");

  // notify app
  window.dispatchEvent(new Event("auth-change"));

  // hard redirect to clear all state
  window.location.replace("/login");
};

export const getUserInfo = async () => {
  try {
    const response = await api.get("/auth/me/");
    return response.data;
  } catch (error) {
    //  token / cookie expired
    forceLogout();
    throw error;
  }
};

export const logout = async () => {
  try {
    await api.post("/auth/logout/");
  } catch (error) {
    console.error("Logout error:", error);
  } finally {
    forceLogout();
  }
};

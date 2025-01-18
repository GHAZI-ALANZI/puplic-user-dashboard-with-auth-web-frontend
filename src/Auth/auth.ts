import axios from "axios";

//API_URL you can get it from backend developer
const API_URL = "http://127.0.0.1:8000/api";

// Register User
export const register = async (name: string, email: string, password: string) => {
  return await axios.post(`${API_URL}/register`, {
    name,
    email,
    password,
    password_confirmation: password,
  });
};

// Login User
export const login = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  localStorage.setItem("token", response.data.token);
  return response.data;
};

// Logout User
export const logout = () => {
  localStorage.removeItem("token"); // Remove JWT token
  window.location.href = "/login"; // Force redirect to login
};


// Get Authenticated User
export const getUserProfile = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");
  const response = await axios.get(`${API_URL}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};

// Update User Profile
export const updateUserProfile = async (userData: { name: string; email: string }) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Not authenticated");

  const response = await axios.put(`${API_URL}/update-profile`, userData, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};

export const updateUserPassword = async (passwordData: { current_password: string; new_password: string; confirm_password: string }) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Not authenticated");

  const response = await axios.put(`${API_URL}/update-password`, passwordData, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};


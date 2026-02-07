// const API_URL = process.env.NEXT_PUBLIC_API_URL;

// if (!API_URL) {
//   throw new Error("NEXT_PUBLIC_API_URL is not defined");
// }

// export const apiRequest = async (
//   endpoint: string,
//   method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
//   body?: any
// ) => {
//   const token = typeof window !== "undefined"
//     ? localStorage.getItem("token")
//     : null;

//   const response = await fetch(`${API_URL}${endpoint}`, {
//     method,
//     headers: {
//       "Content-Type": "application/json",
//       ...(token && { Authorization: `Bearer ${token}` }),
//     },
//     body: body ? JSON.stringify(body) : undefined,
//   });

//   const data = await response.json();

//   if (!response.ok) {
//     throw new Error(data.message || "API request failed");
//   }

//   return data;
// };


import axios from "axios";

/**
 * Base API instance
 * All frontend → backend requests must go through this file
 */
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Attach JWT token automatically to every request
 */
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* ===========================
   AUTH / PROFILE
=========================== */

export const getMyProfile = () => api.get("/auth/me");

/* ===========================
   COMPLAINTS
=========================== */

export const getMyComplaintSummary = () =>
  api.get("/complaints/my/summary");

export const getMyRecentComplaints = () =>
  api.get("/complaints/my?limit=5");

/* ===========================
   EXPORT API INSTANCE
   (optional, for advanced use)
=========================== */

export default api;

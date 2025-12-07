// src/Service/problemRequestService.js
import api from "./api";

export const addProblemRequest = async (data) => {
  try {
    const response = await api.post("/ProblemRequest/addProblemRequest", data);
    return response.data;
  } catch (error) {
    // تحسين logging
    if (error.response) {
      console.error("Error adding problem request:", error.response.status, error.response.data);
      throw error.response.data; // بيانات الخطأ من السيرفر
    } else if (error.request) {
      console.error("No response from server:", error.request);
      throw new Error("لا يوجد استجابة من السيرفر");
    } else {
      console.error("Unexpected error:", error.message);
      throw new Error(error.message);
    }
  }
};


export const getUserProposals = async (userId) => {
  try {
    const response = await api.get(`/ProblemRequest/User/${userId}`);
    return response.data || [];
  } catch (error) {
    console.error("Error fetching user proposals:", error);
    throw error;
  }
};

import axios from "axios";
import { API_URL } from "../utils/apiConfig";

// ==========================================
// RESUME API
// ==========================================

const RESUME_API_URL = `${API_URL}/api/resumes`;


// ==========================================
// CREATE RESUME
// ==========================================

export const createResume = async (resumeData) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      `${RESUME_API_URL}/create`,
      resumeData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;

  } catch (error) {
    console.error(
      "Create Resume Error:",
      error.response?.data || error.message
    );

    throw error;
  }
};


// ==========================================
// GET MY RESUME
// ==========================================

export const getMyResume = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      `${RESUME_API_URL}/my`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;

  } catch (error) {
    console.error(
      "Get My Resume Error:",
      error.response?.data || error.message
    );

    throw error;
  }
};




// import axios from "axios";

// const API_URL = "http://localhost:8000/api/resumes";

// export const createResume = async (resumeData) => {
//     const token = localStorage.getItem("token");

//     const response = await axios.post(
//         `${API_URL}/create`,
//         resumeData,
//         {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         }
//     );

//     return response.data;
// };

// export const getMyResume = async () => {
//     const token = localStorage.getItem("token");

//     const response = await axios.get(
//         `${API_URL}/my`,
//         {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         }
//     );
//     return response.data;
// }
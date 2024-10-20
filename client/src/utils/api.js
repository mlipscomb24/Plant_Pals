import axios from "axios";

const API_BASE_URL = "http://localhost:3001"; // Adjust this if your backend is on a different port

const API = {
  searchPlants: async (query) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/plants/search?query=${encodeURIComponent(query)}`
      );
      return response.data;
    } catch (error) {
      console.error("Error searching plants:", error);
      throw error;
    }
  },

  getPlantDetails: async (plantId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/plants/${plantId}`);
      return response.data;
    } catch (error) {
      console.error("Error getting plant details:", error);
      throw error;
    }
  },
};

export default API;

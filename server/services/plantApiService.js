const fetch = require("node-fetch");
require("dotenv").config();

const PERENUAL_API_KEY = process.env.PERENUAL_API_KEY;
const PERENUAL_API_BASE_URL = "https://perenual.com/api";

// Plant API Service to handle the external API call
const plantApiService = {
  searchPlants: async function (query) {
    const url = `${PERENUAL_API_BASE_URL}/species-list?key=${PERENUAL_API_KEY}&q=${encodeURIComponent(
      query
    )}`;

    console.log("Fetching from URL:", url); // Log the API call for debugging purposes

    const response = await fetch(url);
    const json = await response.json();

    // Handle unsuccessful responses
    if (!response.ok) {
      throw new Error(
        `API responded with status ${response.status}: ${json.message}`
      );
    }

    // Transform the response data to match your GraphQL schema
    return json.data.map((plant) => ({
      _id: plant.id.toString(),
      name: plant.common_name || plant.scientific_name || "Unknown",
      species: plant.scientific_name || "Unknown",
      waterFrequency: plant.watering || "Unknown",
      sunlightNeeds: Array.isArray(plant.sunlight)
        ? plant.sunlight.join(", ")
        : plant.sunlight || "Unknown",
      image_url: plant.default_image ? plant.default_image.regular_url : null,
    }));
  },

  getPlantDetails: async function (plantId) {
    const url = `${PERENUAL_API_BASE_URL}/species/details/${plantId}?key=${PERENUAL_API_KEY}`;

    console.log("Fetching plant details from URL:", url); // Log the API call for debugging purposes

    const response = await fetch(url);
    const json = await response.json();

    // Handle unsuccessful responses
    if (!response.ok) {
      throw new Error(
        `API responded with status ${response.status}: ${json.message}`
      );
    }

    // Transform the response data to match your GraphQL schema
    return {
      _id: json.id.toString(),
      name: json.common_name || "Unknown",
      species: json.scientific_name || "Unknown",
      waterFrequency: json.watering || "Unknown",
      sunlightNeeds: Array.isArray(json.sunlight)
        ? json.sunlight.join(", ")
        : json.sunlight || "Unknown",
      image_url: json.default_image ? json.default_image.regular_url : null,
      description: json.description || "No description available",
    };
  },
};

module.exports = plantApiService;

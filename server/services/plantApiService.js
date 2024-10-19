const fetch = require("node-fetch");
require("dotenv").config();

const PERENUAL_API_KEY = process.env.PERENUAL_API_KEY;
const PERENUAL_API_BASE_URL = "https://perenual.com/api";

const plantApiService = {
  searchPlants: async function (query) {
    const url = `${PERENUAL_API_BASE_URL}/species-list?key=${PERENUAL_API_KEY}&q=${encodeURIComponent(
      query
    )}`;
    const response = await fetch(url);
    const json = await response.json();

    if (!response.ok) {
      throw new Error(
        `API responded with status ${response.status}: ${
          json.message || "Unknown error"
        }`
      );
    }

    console.log("Full API response:", JSON.stringify(json, null, 2));

    return json.data.map((plant) => {
      console.log("Processing plant:", plant);
      return {
        _id: plant.id.toString(),
        name: plant.common_name || plant.scientific_name || "Unknown",
        species: plant.scientific_name || "Unknown",
        waterFrequency: plant.watering || "Unknown",
        sunlightNeeds: Array.isArray(plant.sunlight)
          ? plant.sunlight.join(", ")
          : plant.sunlight || "Unknown",
        image_url: plant.default_image ? plant.default_image.regular_url : null,
      };
    });
  },

  getPlantDetails: async function (plantId) {
    const url = `${PERENUAL_API_BASE_URL}/species/details/${plantId}?key=${PERENUAL_API_KEY}`;
    const response = await fetch(url);
    const json = await response.json();

    if (!response.ok) {
      throw new Error(
        `API responded with status ${response.status}: ${
          json.message || "Unknown error"
        }`
      );
    }

    console.log("Full plant details:", JSON.stringify(json, null, 2));

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

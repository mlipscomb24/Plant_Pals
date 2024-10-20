const plantApiService = require("../services/plantApiService");

const resolvers = {
  Query: {
    searchPlants: async (_, { searchTerm }) => {
      try {
        console.log("Searching for plants with term:", searchTerm);
        const result = await plantApiService.searchPlants(searchTerm);
        console.log("Search result:", result);
        return result;
      } catch (error) {
        console.error("Error searching plants:", error.message);
        throw new Error("Error searching plants. Please try again later.");
      }
    },

    user: async (_, { username }) => {
      // Implement user fetching logic here
      // This is a placeholder and needs to be implemented based on user data structure
      return {
        _id: "user_id",
        username: username,
        email: "user@example.com",
        plants: [],
      };
    },
  },
};

module.exports = resolvers;

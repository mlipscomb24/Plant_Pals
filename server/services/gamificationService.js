const User = require("../models/User"); // Adjust the path as needed
const { calculateTier, checkBadges } = require("../utils/gamificationUtils");

const gamificationService = {
  getGamificationStatus: async (userId) => {
    try {
      const user = await User.findById(userId).populate("plants");
      if (!user) {
        throw new Error("User not found");
      }

      const plantCount = user.plants.length;
      const currentTier = calculateTier(plantCount);
      const badges = checkBadges(user);

      return { currentTier, plantCount, badges };
    } catch (error) {
      console.error("Error fetching gamification status:", error);
      throw error;
    }
  },

  updateGamificationStatus: async (userId) => {
    try {
      const user = await User.findById(userId).populate("plants");
      if (!user) {
        throw new Error("User not found");
      }

      const plantCount = user.plants.length;
      const currentTier = calculateTier(plantCount);
      const badges = checkBadges(user);

      // Update user's gamification data in the database
      user.gamification = { currentTier, badges };
      await user.save();

      return { currentTier, plantCount, badges };
    } catch (error) {
      console.error("Error updating gamification status:", error);
      throw error;
    }
  },
};

module.exports = gamificationService;

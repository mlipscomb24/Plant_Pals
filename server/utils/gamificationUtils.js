// server/utils/gamificationUtils.js

const calculateTier = (plantCount) => {
  if (plantCount >= 100) return "Botanist";
  if (plantCount >= 50) return "Gardener";
  if (plantCount >= 25) return "Sapling";
  if (plantCount >= 10) return "Sprout";
  return "seedlingNew";
};

const checkBadges = (user) => {
  const badges = [];
  const plantCount = user.plants.length;

  badges.push({
    id: "seedling",
    name: "Seedling",
    description: "Started your plant journey",
    image: "/images/seedlingNew.jpeg",
  });

  if (plantCount >= 10) {
    badges.push({
      id: "plant_collector",
      name: "Plant Collector",
      description: "Collected 10 or more plants",
    });
  }

  if (plantCount >= 25) {
    badges.push({
      id: "green_thumb",
      name: "Green Thumb",
      description: "Nurtured a collection of 25 or more plants",
    });
  }

  // Add more badge checks here as needed

  return badges;
};

module.exports = { calculateTier, checkBadges };

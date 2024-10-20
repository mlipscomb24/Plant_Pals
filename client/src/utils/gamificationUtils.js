

const calculateTier = (plantCount) => {
  if (plantCount >= 100) return "Pro_Botanist";
  if (plantCount >= 50) return "gardener";
  if (plantCount >= 25) return "Sapling";
  if (plantCount >= 10) return "Sprout";
  return "Seedling";
};

const checkBadges = (user) => {
  const badges = [];
  const plantCount = user.plants.length;

  if (plantCount >= 10) {
    badges.push({
      id: "plant_collector",
      name: "Plant Collector",
      description: "Collected 10 or more plants",
      image: "/images/Sprout.jpeg",
    });
  }

  if (plantCount >= 25) {
    badges.push({
      id: "green_thumb",
      name: "Green Thumb",
      description: "Nurtured a collection of 25 or more plants",
      image: "/images/Sapling.jpeg",
    });
  }

  if (plantCount >= 50) {
    badges.push({
      id: "master_gardener",
      name: "Master Gardener",
      description: "Cultivated a thriving garden of 50 or more plants",
      image: "/images/gardener.jpeg",
    });
  }

  if (plantCount >= 100) {
    badges.push({
      id: "pro_botanist",
      name: "Pro Botanist",
      description: "Achieved botanical mastery with 100 or more plants",
      image: "/images/Pro_Botanist.jpeg",
    });
  }

  return badges;
};

module.exports = { calculateTier, checkBadges };

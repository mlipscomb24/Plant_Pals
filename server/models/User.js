// server/models/User.js

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  // ... other fields ...
  gamification: {
    currentTier: {
      type: String,
      default: "Seedling",
    },
    badges: [
      {
        id: String,
        name: String,
        description: String,
      },
    ],
  },
  plants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plant",
    },
  ],
});

module.exports = mongoose.model("User", UserSchema);

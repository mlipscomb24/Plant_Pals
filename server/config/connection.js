const mongoose = require("mongoose");

// Use the same database name that's in your current code
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/plant_pals");

const db = mongoose.connection;

db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

db.once("open", () => {
  console.log("Successfully connected to MongoDB.");
  // Add this debug line to show which database we're connected to
  console.log("Connected to database:", db.name);

  // check for existing collections
  db.db.listCollections().toArray((err, collections) => {
    if (err) {
      console.error("Error listing collections:", err);
    } else {
      console.log(
        "Available collections:",
        collections.map((c) => c.name)
      );
    }
  });
});

module.exports = db;

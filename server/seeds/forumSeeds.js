const db = require("../config/connection");
const { Post, User } = require("../models");

// Simple seed data for posts
const forumSeeds = {
  posts: [
    {
      title: "How to Care for Succulents",
      content:
        "Succulents are easy to care for. Water them sparingly, and place them in bright, indirect sunlight.",
    },
    {
      title: "Best Fertilizers for Indoor Plants",
      content:
        "Using organic fertilizers is the best way to ensure your indoor plants get the nutrients they need.",
    },
    {
      title: "Dealing with Overwatering",
      content:
        "Overwatering is one of the most common mistakes. Always check if the topsoil is dry before watering.",
    },
    {
      title: "Propagation Tips for Beginners",
      content:
        "Propagation is a fun way to expand your plant collection. Start with easy plants like pothos or snake plants.",
    },
    {
      title: "Identifying Common Plant Pests",
      content:
        "Spider mites, aphids, and mealybugs are common indoor plant pests. Neem oil can help control infestations.",
    },
  ],
};

const seedForum = async () => {
  try {
    console.log("Starting database seeding...");

    // Clear existing posts and users
    console.log("Clearing existing data...");
    await Promise.all([Post.deleteMany({}), User.deleteMany({})]);
    console.log("Existing data cleared");

    // Create a dummy user with required fields
    console.log("Creating a dummy user...");
    const dummyUser = await User.create({
      username: "testuser",
      email: "testuser@example.com", // Add a valid email
      password: "password123",
    });
    console.log(`Dummy user created: ${dummyUser.username}`);

    // Create posts and associate them with the dummy user
    console.log("Creating posts...");
    const posts = await Promise.all(
      forumSeeds.posts.map(async (post) => {
        return Post.create({
          ...post,
          author: dummyUser._id, // Associate with the dummy user
          likes: Math.floor(Math.random() * 20),
        });
      })
    );
    console.log(`Created ${posts.length} posts`);

    // Verify seeded data
    const seededPosts = await Post.find({});
    console.log(`Verification: Found ${seededPosts.length} posts in database`);
    if (seededPosts.length > 0) {
      console.log("Sample post:", {
        title: seededPosts[0].title,
        author: seededPosts[0].author,
      });
    }

    console.log("All seeds planted successfully! 🌱");
    process.exit(0);
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
};

// Add error handler for database connection
db.on("error", (err) => {
  console.error("MongoDB connection error:", err);
  process.exit(1);
});

db.once("open", () => {
  console.log("Connected to MongoDB successfully");
  seedForum();
});

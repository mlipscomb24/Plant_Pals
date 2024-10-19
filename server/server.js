const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
const cors = require("cors"); // Import CORS package
const { typeDefs, resolvers } = require("./schemas"); // Correctly importing the index.js from schemas
const db = require("./config/connection");
const plantApiService = require("./services/plantApiService");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Enable CORS for all routes and origins
app.use(cors());

// New API routes
app.get("/api/plants/search", async (req, res) => {
  try {
    const { query } = req.query;
    const results = await plantApiService.searchPlants(query);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/plants/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const plant = await plantApiService.getPlantDetails(id);
    res.json(plant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};

// Call the async function to start the server
startApolloServer();

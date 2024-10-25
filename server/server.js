const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
const cors = require("cors");
const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");
const { authMiddleware } = require("./utils/auth");
const plantApiService = require("./services/plantApiService");
require("dotenv").config();


const { Post, Comment, User } = require("./models");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Explicit CORS setup
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

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

// stripe api
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-09-30.acacia", 
});

app.use(express.static(process.env.STATIC_DIR));

//   rontend index.html file for the root route
app.get("/", (req, res) => {
  const path = resolve(process.env.STATIC_DIR + "/index.html");
  res.sendFile(path);
});

// Get the Stripe publishable key from environment variables
app.get("/config", (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

// Create a Payment Intent on the server
app.post("/create-payment-intent", async (req, res) => {
  try {
    // You can dynamically set the amount, currency, etc., from the request body if needed
    const { amount = [], currency = "usd" } = req.body;

    // Create the PaymentIntent with automatic payment methods enabled
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // Default is 1999 (19.99 USD)
      currency, // Default is "usd"
      automatic_payment_methods: {
        enabled: true, // Enable automatic handling of payment methods
      },
    });

    // Send back the client secret to the frontend
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (e) {
    res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
});

// Set up Apollo Server
// Updated Apollo Server with auth middleware
const server = new ApolloServer({
  typeDefs,
  resolvers,
  persistedQueries: {
    cache: "bounded",
  },
  context: async ({ req }) => {
    // Add auth middleware to context
    const authContext = authMiddleware({ req });
    return {
      user: authContext.user,
      models: { Post, Comment, User },
    };
  },
  formatError: (err) => {
    console.error("GraphQL Error:", err);
    return err;
  },
  plugins: [
    {
      requestDidStart(requestContext) {
        console.log("Request started:", requestContext.request.query);
        return {
          willSendResponse(requestContext) {
            console.log("Response:", requestContext.response);
          },
        };
      },
    },
  ],
});

const startApolloServer = async () => {
  await server.start();

  server.applyMiddleware({
    app,
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });

  if (process.env.NODE_ENV === "production") {
    console.log("Currently in production mode");
    app.use(express.static(path.join(__dirname, "../client/build")));

    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client/build", "index.html"));
    });
  }

  db.once("open", () => {
    Post.find({}).then((posts) => {
      console.log("Current posts in database:", posts);
    });

    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};

startApolloServer();

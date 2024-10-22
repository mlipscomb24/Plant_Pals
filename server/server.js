const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
const cors = require("cors");
const { hourlyNotifCheck } = require("./services/notificationService");
const cron = require("node-cron");
const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");

const plantApiService = require("./services/plantApiService");
require("dotenv").config();

const { Post, Comment, User } = require("./models");
const webPush = require("web-push");


const app = express();
const PORT = process.env.PORT || 3001;

webPush.setVapidDetails(
  'mailto:ddunnemann@gmail.com',
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Explicit CORS setup allowing requests from the frontend
app.use(
  cors({
    origin: "http://localhost:3000", // Ensure this matches your frontend URL
    credentials: true, // If you are using cookies/auth, enable this
  })
);

cron.schedule('0 * * * *', hourlyNotifCheck);

// Set up Apollo Server with debugging and logging
const server = new ApolloServer({
  typeDefs,
  resolvers,

  persistedQueries: {
    cache: "bounded",
  },

  context: async ({ req }) => {
    return {
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
  // Apply middleware to allow CORS in Apollo Server specifically
  server.applyMiddleware({
    app,
    cors: {
      origin: "http://localhost:3000", // Your client URL
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
    // Add this debug query when the database connects
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

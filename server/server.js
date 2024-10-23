const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
const cors = require("cors");
const cron = require("node-cron");
const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");
const { retrieveUsers } = require('./utils/retrieveUsers');
const { authMiddleware } = require("./utils/auth");
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

// Explicit CORS setup
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

const hourlyNotifCheck = async () => {
    const users = await retrieveUsers();
    const now = new Date();

    users.forEach(user => {
        const { notifications, subscription } = user;
        if (notifDetermination(notifications, now)) {
            const payload = JSON.stringify({
                title: 'Plant Pals Notification',
                body: 'Time to care for your plants!',
            });
            sendNotification(subscription, payload);
        }
    });
};

cron.schedule('0 * * * *', hourlyNotifCheck);

// Set up Apollo Server with debugging and logging
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

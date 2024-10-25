import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import "semantic-ui-css/semantic.min.css";
import "./custom.css";
import App from "./App.jsx";

// Determine the GraphQL endpoint based on the environment
const gqlEndpoint =
  process.env.NODE_ENV === "production"
    ? "https://plant-pals.onrender.com/graphql"
    : "http://localhost:3001/graphql";

// Create an HTTP link
const httpLink = createHttpLink({
  uri: gqlEndpoint, // Adjust this if your GraphQL endpoint is different
});

// Error handling link
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

// Authentication link
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// Create Apollo Client with all links properly chained
const client = new ApolloClient({

  uri: gqlEndpoint,
  link: errorLink.concat(authLink.concat(httpLink)), // Chain the links together
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "network-only",
      errorPolicy: "all",
    },
    query: {
      fetchPolicy: "network-only",
      errorPolicy: "all",
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Router>
        <App />
      </Router>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// Service worker registration
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register("/pwa-service-worker.js")
  .then(registration => {
    console.log("Service worker registered: ", registration.scope);

    registration.onupdatefound = () => {
      const installingWorker = registration.installing;
      installingWorker.onstatechange = () => {
        if (installingWorker.state === "installed") {
          if (navigator.serviceWorker.controller) {
            console.log("New content is available; please refresh.");
          } else {
            console.log("Content is cached for offline use.");
        }
      }
    };
  };
})
.catch(error => {
  console.error("Error during service worker registration:", error);
});
}

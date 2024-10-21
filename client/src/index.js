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

// Authentication link (for future use)
const authLink = setContext((_, { headers }) => {
  // Get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
  // Return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// Create an Apollo Client instance
const client = new ApolloClient({
  uri: gqlEndpoint,
  cache: new InMemoryCache(),
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
  navigator.serviceWorker.register("/pwa-service-worker.js");
}

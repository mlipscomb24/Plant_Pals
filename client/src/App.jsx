import React from "react";
import { Routes, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  useQuery,
  gql,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";

// Import your components
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Plantcare from "./pages/Plantcare";
import Donation from "./pages/Donation";
import Header from "./components/Header";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import LoadingSpinner from "./components/LoadingSpinner";

// Import your queries
import { GLOBAL_LOADING_QUERY } from "./utils/queries";

// Create an HTTP link
const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL_URL || "/graphql",
});

// Create a middleware for authentication
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

// Create an error handling link
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

// Create the Apollo Client instance
const client = new ApolloClient({
  link: errorLink.concat(authLink.concat(httpLink)),
  cache: new InMemoryCache(),
  typeDefs: gql`
    extend type Query {
      isLoading: Boolean!
    }
  `,
  resolvers: {
    Query: {
      isLoading: () => false,
    },
  },
});

// Initialize the isLoading state in the cache
client.writeQuery({
  query: GLOBAL_LOADING_QUERY,
  data: {
    isLoading: false,
  },
});

function AppContent() {
  const { data } = useQuery(GLOBAL_LOADING_QUERY);
  const isLoading = data?.isLoading;

  return (
    <div className="App">
      {isLoading && <LoadingSpinner />}
      <Header />
      <Container style={{ marginTop: "7em" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/plantcare" element={<Plantcare />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/donation" element={<Donation/>} />
        </Routes>
      </Container>
    </div>
  );
}

function App() {
  return (
    <ApolloProvider client={client}>
      <AppContent />
    </ApolloProvider>
  );
}

export default App;

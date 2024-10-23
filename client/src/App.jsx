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

// Import components
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Plantcare from "./pages/Plantcare";
import Donation from "./pages/Donation";
import PostDetail from "./pages/PostDetail";
import Header from "./components/Header";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import LoadingSpinner from "./components/LoadingSpinner";

// Import queries
import { GLOBAL_LOADING_QUERY } from "./utils/queries";

// Create an HTTP link
const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL_URL || "/graphql",
});

// Create a middleware for authentication
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// Enhanced error handling link
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
      // You could add toast notifications here if you want to show errors to users
    });
  }
  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
    // Handle network errors (optional)
  }
});

// Apollo Client configuration
const client = new ApolloClient({
  link: errorLink.concat(authLink.concat(httpLink)),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          isLoading: {
            read() {
              return false;
            },
          },
        },
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network",
      errorPolicy: "all",
    },
    query: {
      fetchPolicy: "network-only",
      errorPolicy: "all",
    },
  },
});

// Initialize cache
client.writeQuery({
  query: GLOBAL_LOADING_QUERY,
  data: {
    isLoading: false,
  },
});

// Main content component
function AppContent() {
  const { data } = useQuery(GLOBAL_LOADING_QUERY);
  const isLoading = data?.isLoading;

  return (
    <div className="App">
      {isLoading && <LoadingSpinner />}
      <Header />
      <Container style={{ marginTop: "7em" }}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/donation" element={<Donation/>} />

          {/* Forum Routes */}
          <Route path="/plantcare" element={<Plantcare />} />
          <Route path="/plantcare/post/:id" element={<PostDetail />} />

          {/* Protected Routes */}
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Container>
    </div>
  );
}

// Root App component
function App() {
  return (
    <ApolloProvider client={client}>
      <AppContent />
    </ApolloProvider>
  );
}

export default App;

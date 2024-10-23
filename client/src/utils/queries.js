import { gql } from "@apollo/client";

// Keep existing loading query
export const GLOBAL_LOADING_QUERY = gql`
  query GlobalLoading {
    isLoading @client
  }
`;

// Fragment for Plant fields (Avoid duplicating fragment)
export const PLANT_FIELDS = gql`
  fragment PlantFields on Plant {
    _id
    name
    species
    waterFrequency
    sunlightNeeds
    image_url
  }
`;

// Fragment for Post fields
export const POST_FIELDS = gql`
  fragment PostFields on Post {
    _id
    title
    content
    createdAt
    author {
      _id
      username
    }
    comments {
      _id
      content
      author {
        username
      }
      createdAt
    }
    likes
    tags
  }
`;

// Fragment for Comment fields
export const COMMENT_FIELDS = gql`
  fragment CommentFields on Comment {
    _id
    content
    createdAt
    author {
      _id
      username
    }
  }
`;

// Updated ME query with all necessary fields
export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      plants {
        ...PlantFields
      }
      posts {
        ...PostFields
      }
      comments {
        ...CommentFields
      }
    }
  }
  ${PLANT_FIELDS}
  ${POST_FIELDS}
  ${COMMENT_FIELDS}
`;

// Search Plants query
export const SEARCH_PLANTS = gql`
  query SearchPlants($searchTerm: String!) {
    searchPlants(searchTerm: $searchTerm) {
      _id
      name
      species
      waterFrequency
      sunlightNeeds
      image_url
    }
  }
`;

// Get all Plants query using the Plant fields fragment
export const GET_PLANTS = gql`
  query getPlants {
    plants {
      ...PlantFields
    }
  }
  ${PLANT_FIELDS}
`;

// Get User by Username query
export const GET_USER = gql`
  query getUser($username: String!) {
    user(username: $username) {
      _id
      username
      email
      plants {
        ...PlantFields
      }
      posts {
        ...PostFields
      }
      comments {
        ...CommentFields
      }
    }
  }
  ${PLANT_FIELDS}
  ${POST_FIELDS}
  ${COMMENT_FIELDS}
`;

// Forum Queries
export const GET_POSTS = gql`
  query GetPosts {
    posts {
      ...PostFields
    }
  }
  ${POST_FIELDS}
`;

export const GET_POST = gql`
  query GetPost($id: ID!) {
    post(id: $id) {
      ...PostFields
    }
  }
  ${POST_FIELDS}
`;

export const GET_USER_POSTS = gql`
  query GetUserPosts($userId: ID!) {
    userPosts(userId: $userId) {
      ...PostFields
    }
  }
  ${POST_FIELDS}
`;

// Get all Users query
export const QUERY_USERS = gql`
  query allUsers {
    users {
      _id
      username
      plants {
        ...PlantFields
      }
    }
  }
  ${PLANT_FIELDS}
`;

// Get a single User by ID query
export const QUERY_SINGLE_USER = gql`
  query singleUser($userId: ID!) {
    user(userId: $userId) {
      _id
      username
      plants {
        ...PlantFields
      }
    }
  }
  ${PLANT_FIELDS}
`;

// Export all fragments for reuse
export const FRAGMENTS = {
  PLANT_FIELDS,
  POST_FIELDS,
  COMMENT_FIELDS,
};

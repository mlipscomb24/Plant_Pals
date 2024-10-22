import { gql } from "@apollo/client";

// Keep existing loading query
export const GLOBAL_LOADING_QUERY = gql`
  query GlobalLoading {
    isLoading @client
  }
`;

// Keep existing fragments
const PLANT_FIELDS = gql`
  fragment PlantFields on Plant {
    _id
    name
    species
    waterFrequency
    sunlightNeeds
    image_url
  }
`;

const POST_FIELDS = gql`
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

const COMMENT_FIELDS = gql`
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

// Keep existing plant-related queries
export const GET_PLANTS = gql`
  query getPlants {
    plants {
      ...PlantFields
    }
  }
  ${PLANT_FIELDS}
`;

export const SEARCH_PLANTS = gql`
  query searchPlants($searchTerm: String!) {
    searchPlants(searchTerm: $searchTerm) {
      ...PlantFields
    }
  }
  ${PLANT_FIELDS}
`;

// Updated user query
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

// Forum queries
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

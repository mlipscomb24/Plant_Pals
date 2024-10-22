import { gql } from "@apollo/client";

// Keep existing loading query
export const GLOBAL_LOADING_QUERY = gql`
  query GlobalLoading {
    isLoading @client
  }
`;

// Keep existing plant fields fragment
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

// Update post fields fragment with more comprehensive fields
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

// Update comment fields fragment
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

// Update user query to include forum data
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

// Update forum queries
export const GET_POSTS = gql`
  query GetPosts {
    posts {
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
  }
`;

export const GET_POST = gql`
  query GetPost($id: ID!) {
    post(id: $id) {
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
  }
`;

export const GET_USER_POSTS = gql`
  query GetUserPosts($userId: ID!) {
    userPosts(userId: $userId) {
      ...PostFields
    }
  }
  ${POST_FIELDS}
`;

// Export all fragments for reuse
export const FRAGMENTS = {
  PLANT_FIELDS,
  POST_FIELDS,
  COMMENT_FIELDS,
};

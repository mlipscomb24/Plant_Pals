import { gql } from "@apollo/client";

// Keep existing loading query
export const GLOBAL_LOADING_QUERY = gql`
  query GlobalLoading {
    isLoading @client
  }
`;

// Fragment for Plant fields
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

// Updated Post fields fragment with avatar
export const POST_FIELDS = gql`
  fragment PostFields on Post {
    _id
    title
    content
    createdAt
    author {
      _id
      username
      avatar
    }
    comments {
      _id
      content
      author {
        username
        avatar
      }
      createdAt
    }
    likes
    tags
  }
`;

// Updated Comment fields fragment with avatar
export const COMMENT_FIELDS = gql`
  fragment CommentFields on Comment {
    _id
    content
    createdAt
    author {
      _id
      username
      avatar
    }
  }
`;

// Updated ME query with avatar
export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      avatar
      plants {
        ...PlantFields
      }
      posts {
        ...PostFields
      }
      comments {
        ...CommentFields
      }
      gamification {
        currentTier
        badges {
          id
          name
          description
        }
      }
      forumActivity {
        totalPosts
        totalComments
        helpfulResponses
      }
    }
  }
  ${PLANT_FIELDS}
  ${POST_FIELDS}
  ${COMMENT_FIELDS}
`;

// Search Plants query remains the same
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

// Get all Plants query remains the same
export const GET_PLANTS = gql`
  query getPlants {
    plants {
      ...PlantFields
    }
  }
  ${PLANT_FIELDS}
`;

// Updated Get User query with avatar
export const GET_USER = gql`
  query getUser($username: String!) {
    user(username: $username) {
      _id
      username
      email
      avatar
      plants {
        ...PlantFields
      }
      posts {
        ...PostFields
      }
      comments {
        ...CommentFields
      }
      gamification {
        currentTier
        badges {
          id
          name
          description
        }
      }
      forumActivity {
        totalPosts
        totalComments
        helpfulResponses
      }
    }
  }
  ${PLANT_FIELDS}
  ${POST_FIELDS}
  ${COMMENT_FIELDS}
`;

// Forum Queries remain the same as they use updated fragments
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

// Updated Query Users with avatar
export const QUERY_USERS = gql`
  query allUsers {
    users {
      _id
      username
      avatar
      plants {
        ...PlantFields
      }
    }
  }
  ${PLANT_FIELDS}
`;

// Updated Single User query with avatar
export const QUERY_SINGLE_USER = gql`
  query singleUser($userId: ID!) {
    user(userId: $userId) {
      _id
      username
      avatar
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

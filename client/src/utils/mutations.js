import { gql } from "@apollo/client";

// Existing plant-related mutations
export const ADD_PLANT = gql`
  mutation AddPlant($plantData: PlantInput!) {
    addPlant(plantData: $plantData) {
      _id
      name
      waterReminder
      sunlightNeeds
    }
  }
`;

export const DELETE_PLANT = gql`
  mutation DeletePlant($plantId: ID!) {
    deletePlant(plantId: $plantId) {
      _id
    }
  }
`;

// New forum-related mutations
export const CREATE_POST = gql`
  mutation CreatePost($input: PostInput!) {
    createPost(input: $input) {
      _id
      title
      content
      author {
        _id
        username
      }
      createdAt
      likes
      tags
      comments {
        _id
      }
    }
  }
`;

export const UPDATE_POST = gql`
  mutation UpdatePost($id: ID!, $input: PostInput!) {
    updatePost(id: $id, input: $input) {
      _id
      title
      content
      tags
      updatedAt
    }
  }
`;

export const DELETE_POST = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id)
  }
`;

export const CREATE_COMMENT = gql`
  mutation CreateComment($input: CommentInput!) {
    createComment(input: $input) {
      _id
      content
      author {
        _id
        username
      }
      createdAt
    }
  }
`;

export const LIKE_POST = gql`
  mutation LikePost($id: ID!) {
    likePost(id: $id) {
      _id
      likes
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
  login(email: $email, password: $password) {
  token 
  user {
    _id
     }
   }
 }
`;

export const CREATE_USER = gql`
  mutation createUser(
  $firstName: String!, 
  $lastName: String!
  $email: String!, 
  $password: String!
  ) {
    createUser(
    firstName: $firstName, 
    lastName: $lastName, 
    email: $email, 
    password: $password
    ) {
      token
      user {
        _id 
        }
    }
}
`;



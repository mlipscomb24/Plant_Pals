import { gql } from "@apollo/client";

// Authentication Mutations
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation createUser(
    $username: String!
    $email: String!
    $password: String!
    $firstName: String
    $lastName: String
  ) {
    createUser(
      username: $username
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
    ) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

// Plant Mutations
export const ADD_PLANT = gql`
  mutation AddPlant($plantData: PlantInput!) {
    addPlant(plantData: $plantData) {
      _id
      name
      species
      waterFrequency
      sunlightNeeds
      image_url
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

// Forum Mutations
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
        content
        author {
          username
        }
        createdAt
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

// Update Profile Mutations
export const UPDATE_USER = gql`
  mutation updateUser(
    $firstName: String
    $lastName: String
    $email: String
    $password: String
  ) {
    updateUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      _id
      username
      email
      firstName
      lastName
    }
  }
`;

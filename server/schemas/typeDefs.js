const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Plant {
    _id: ID!
    name: String!
    species: String
    waterFrequency: String
    sunlightNeeds: String
    image_url: String
  }

  type User {
    _id: ID
    username: String
    email: String
    plants: [Plant]
    posts: [Post]
    comments: [Comment]
    postCount: Int
    commentCount: Int
  }

  type Post {
    _id: ID!
    title: String!
    content: String!
    author: User!
    createdAt: String!
    updatedAt: String
    comments: [Comment]
    commentCount: Int
    likes: Int
    tags: [String]
  }

  type Comment {
    _id: ID!
    content: String!
    author: User!
    post: Post!
    createdAt: String!
    updatedAt: String
  }

  input PostInput {
    title: String!
    content: String!
    tags: [String]
  }

  input CommentInput {
    content: String!
    postId: ID!
  }

  type Query {
    plants: [Plant]
    searchPlants(searchTerm: String!): [Plant]
    user(username: String!): User
    posts: [Post]
    post(id: ID!): Post
    userPosts(userId: ID!): [Post]
    getPostsByTag(tag: String!): [Post]
    getRecentPosts(limit: Int): [Post]
  }

  type Mutation {
    createPost(input: PostInput!): Post
    updatePost(id: ID!, input: PostInput!): Post
    deletePost(id: ID!): Post
    createComment(input: CommentInput!): Comment
    deleteComment(id: ID!): Comment
    likePost(id: ID!): Post
  }
`;

module.exports = typeDefs;

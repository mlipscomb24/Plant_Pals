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
    firstName: String
    lastName: String
    plants: [Plant]
    posts: [Post]
    comments: [Comment]
    postCount: Int
    commentCount: Int
    gamification: Gamification
    forumActivity: ForumActivity
  }

  type Gamification {
    currentTier: String
    badges: [Badge]
  }

  type Badge {
    id: String
    name: String
    description: String
  }

  type ForumActivity {
    totalPosts: Int
    totalComments: Int
    helpfulResponses: Int
    lastPostDate: String
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

  type Auth {
    token: ID!
    user: User
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

  input PlantInput {
    name: String!
    species: String
    waterFrequency: String
    sunlightNeeds: String
    image_url: String
  }

  type Query {
    me: User
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
    # Auth Mutations
    createUser(
      username: String!
      email: String!
      password: String!
      firstName: String
      lastName: String
    ): Auth
    login(email: String!, password: String!): Auth

    # Plant Mutations
    addPlant(plantData: PlantInput!): Plant
    deletePlant(plantId: ID!): Plant
    updatePlant(plantId: ID!, plantData: PlantInput!): Plant

    # Post Mutations
    createPost(input: PostInput!): Post
    updatePost(id: ID!, input: PostInput!): Post
    deletePost(id: ID!): Post

    # Comment Mutations
    createComment(input: CommentInput!): Comment
    deleteComment(id: ID!): Comment

    # Social Mutations
    likePost(id: ID!): Post
  }
`;

module.exports = typeDefs;

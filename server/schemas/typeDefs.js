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

  type Query {
    plants: [Plant]
    searchPlants(searchTerm: String!): [Plant]
    user(username: String!): User
  }

  type User {
    _id: ID
    username: String
    email: String
    plants: [Plant]
  }
`;

module.exports = typeDefs;

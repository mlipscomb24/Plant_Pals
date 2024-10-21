import { gql } from "@apollo/client";

export const QUERY_USERS = gql`
 query allUsers { 
  users {
    _id
    username
    plants
  }
}   
`;

export const QUERY_SINGLE_USER = gql`
  query singleUser($userId: ID!) {
  user(userId: $userId) {
    _id
    username
    plants {
      _id
      species
      waterFrequency
      }
  }
}
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      plants {
        _id
        species
        waterFrequency
      }
    }
  `;

export const SEARCH_PLANTS = gql`
  query searchPlants($searchTerm: String!) {
    searchPlants(searchTerm: $searchTerm) {
      _id
      name
      species
      waterFrequency
    }
  }
`;

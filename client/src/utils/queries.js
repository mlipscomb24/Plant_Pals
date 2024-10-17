import { gql } from "@apollo/client";

export const GET_PLANTS = gql`
  query getPlants {
    plants {
      _id
      name
      species
      waterFrequency
    }
  }
`;

export const GET_USER = gql`
  query getUser($username: String!) {
    user(username: $username) {
      _id
      username
      email
      plants {
        _id
        name
        species
        waterFrequency
      }
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

import { gql } from "@apollo/client";

export const GLOBAL_LOADING_QUERY = gql`
  query GlobalLoading {
    isLoading @client
  }
`;

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

export const GET_PLANTS = gql`
  query getPlants {
    plants {
      ...PlantFields
    }
  }
  ${PLANT_FIELDS}
`;

export const GET_USER = gql`
  query getUser($username: String!) {
    user(username: $username) {
      _id
      username
      email
      plants {
        ...PlantFields
      }
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

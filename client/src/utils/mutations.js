import { gql } from "@apollo/client";

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

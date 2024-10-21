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

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
  login(email: $email, password: $password) {
  token 
  profile {
    _id
    name
     }
   }
 }
`;

export const ADD_USER = gql`
  mutation addUser(
  $firstName: String!, 
  $lastName: String!
  $email: String!, 
  $password: String!
  ) {
    addUser(
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
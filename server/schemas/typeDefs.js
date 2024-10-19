const typeDefs = `
type Profile {
  _id: ID
  name: String
  email: String
  plants: [Plant]
}
  type Auth {
  token: ID!
  profile: Profile
}
  type Query {
    profiles: [Profile]!
    profile(_id: ID!): Profile
    me: Profile
  }
    
  type Mutation {
    signUp(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    createPlant(profileId: ID!, name: String!, species: String!): Profile
    removeProfile: Profile
    removePlant(profileId: ID!, name: String!, species: String!): Profile

}
    type Plant {     
      _id: ID!
      name: String
      species: String
      waterFrequency: String
      sunlightNeeds: String
      waterReminder: String
      owner: Profile
    ): Plant
    deletePlant(_id: ID!): ID
  }
`;

module.exports = typeDefs;
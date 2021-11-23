const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Book {
    _id: ID
    name: String
    building: String
    creditHours: Int
  }
  type User {
      _id: ID
      name: String
  }
  type: Query {
      me:User
  }
  type Mutations {
      login(email: String, password: string): Auth
  }
`;

module.exports = typeDefs;
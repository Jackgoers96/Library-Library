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
  type Query {
      me:User
  }
  input BookInput {
    authors: [String]
    description: String
    title: String
    bookId: Int
    image: String
    link: String
  }
  type Mutations {
      login(email: String, password: String): Auth
      addUser (username: String, email: String, password: String): Auth
      saveBook (bookData:BookInput!): User
      removeBook (bookId): User
            
    }
  }

`;

module.exports = typeDefs;
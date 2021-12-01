const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Auth {
        token: ID!
        user: User
    }
    type User {
        _id: ID
        username: String!
        email: String
        bookCount: Int
        saveBooks: [Book]
    }
    type Book {
        bookID: String
        authors: String
        description: String
        image: String
        link: String
        title: String
    }
    input SavedBook {
        authors: [String]
        description: String
        bookId: String
        image: String
        link: String
        title: String
    }
    type Query {
        me: User
    }
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(bookData: SavedBook!): User
        removeBook(bookId: ID!): User
    }
`;

module.exports = typeDefs;
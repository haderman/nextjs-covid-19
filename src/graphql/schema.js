import { gql } from "apollo-server-micro";

const typeDefs = gql`
  type Query {
    users: [User]!
    me: User
  }

  type Mutation {
    createUser(email: String!): [User]
    login(email: String!): User
  }

  type User {
    id: ID!
    name: String
    email: String!
    token: String
  }
`

export default typeDefs

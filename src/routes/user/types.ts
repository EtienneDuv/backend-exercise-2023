export const userTypes = `#graphql
  """Represents an user"""
  type User {
    id: ID!
    username: String!
    password: String
    createdAt: Date!
    # articles: [Article]!
    # comments: [Comment]!
  }

  input CreateOrLoginUserData {
    username: String!
    password: String!
  }

  type Query {
    getUsers(limit: Int): [User]!
  }

  type Mutation {
    createUser(data: CreateOrLoginUserData): User!
    login(data: CreateOrLoginUserData): User!
  }
`;
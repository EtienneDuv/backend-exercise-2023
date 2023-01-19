export const userTypes = `#graphql
  type User {
    """ UUID identifier """
    id: ID! 
    """ Unique name """
    username: String! 
    """ User password """
    password: String 
    """ Creation date """
    createdAt: String! 
    # articles: [Article]!
    # comments: [Comment]!
  }

  input CreateOrLoginUserData {
    username: String!
    password: String!
  }

  type Query {
    getUsers(limit: Int): [User!]
  }

  type Mutation {
    createUser(data: CreateOrLoginUserData): User!
    login(data: CreateOrLoginUserData): User!
  }
`;
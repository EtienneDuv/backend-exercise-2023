import {userTypes, userMutations, userQueries, userResolvers} from './user';

export const typeDefs = `#graphql
     type Query
     type Mutation
     scalar Date
     ${userTypes}
`;

export const resolvers = {
    Query: {
        ... userQueries,
    },
    Mutation: {
        ... userMutations
    },
    User: userResolvers,
};
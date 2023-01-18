import {userTypes, userMutations, userQueries, userResolvers} from './user';
import {GraphQLDateTime} from 'graphql-iso-date';

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
    Date: GraphQLDateTime,
};
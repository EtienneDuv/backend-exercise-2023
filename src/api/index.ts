import {userMutations, userQueries, userResolvers} from './user';
import {getGraphqlTypeDefString} from '../services/fileService';

export const typeDefs = `#graphql
     type Query
     type Mutation
     ${getGraphqlTypeDefString()}
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
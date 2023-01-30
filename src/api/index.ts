import {userMutations, userQueries, userResolvers} from './user';
import {articleMutations, articleQueries, articleResolvers} from './article';
import {getGraphqlTypeDefString} from '../services/fileService';

export const typeDefs = `#graphql
     type Query
     type Mutation
     ${getGraphqlTypeDefString()}
`;

export const resolvers = {
    Query: {
        ... userQueries,
        ...articleQueries,
    },
    Mutation: {
        ... userMutations,
        ...articleMutations,
    },
    User   : userResolvers,
    Article: articleResolvers
};
import {userMutations, userQueries, userResolvers} from './user';
import {articleMutations, articleQueries, articleResolvers} from './article';
import {commentMutations, commentQueries, commentResolvers} from './comment';
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
        ...commentQueries,
    },
    Mutation: {
        ... userMutations,
        ...articleMutations,
        ...commentMutations,
    },
    User   : userResolvers,
    Article: articleResolvers,
    Comment: commentResolvers,
};
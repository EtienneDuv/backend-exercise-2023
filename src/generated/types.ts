import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Article = {
  __typename?: 'Article';
  /**  UUID of author  */
  authorId: Scalars['ID'];
  comments: Array<Comment>;
  content: Scalars['String'];
  createdAt: Scalars['String'];
  /**  UUID identifier  */
  id: Scalars['ID'];
  /**  Short brief of the content  */
  perex: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['String'];
};


export type ArticleCommentsArgs = {
  topLevelOnly?: InputMaybe<Scalars['Boolean']>;
};

export type Comment = {
  __typename?: 'Comment';
  articleId: Scalars['ID'];
  authorId: Scalars['ID'];
  children: Array<Comment>;
  content: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  score: Scalars['Int'];
};

export type Jwt = {
  __typename?: 'Jwt';
  token: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  answerComment: Comment;
  createArticle: Article;
  createComment: Comment;
  createUser: User;
  deleteArticle?: Maybe<Scalars['Boolean']>;
  downVoteComment?: Maybe<Scalars['Boolean']>;
  /**  Login with username/password, return JWT token  */
  login: Jwt;
  upVoteComment?: Maybe<Scalars['Boolean']>;
  updateArticle: Article;
};


export type MutationAnswerCommentArgs = {
  commentId: Scalars['ID'];
  content: Scalars['String'];
};


export type MutationCreateArticleArgs = {
  content: Scalars['String'];
  perex: Scalars['String'];
  title: Scalars['String'];
};


export type MutationCreateCommentArgs = {
  articleId: Scalars['ID'];
  content: Scalars['String'];
};


export type MutationCreateUserArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationDeleteArticleArgs = {
  articleId: Scalars['ID'];
};


export type MutationDownVoteCommentArgs = {
  commentId: Scalars['ID'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationUpVoteCommentArgs = {
  commentId: Scalars['ID'];
};


export type MutationUpdateArticleArgs = {
  articleId: Scalars['ID'];
  content?: InputMaybe<Scalars['String']>;
  perex?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  getArticle: Article;
  getArticles: Array<Article>;
  getComments: Array<Comment>;
  getUser: User;
  getUsers: Array<User>;
};


export type QueryGetArticleArgs = {
  articleId: Scalars['ID'];
};


export type QueryGetArticlesArgs = {
  limit?: InputMaybe<Scalars['Int']>;
};


export type QueryGetCommentsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
};


export type QueryGetUserArgs = {
  userId: Scalars['ID'];
};


export type QueryGetUsersArgs = {
  limit?: InputMaybe<Scalars['Int']>;
};

export type User = {
  __typename?: 'User';
  articles: Array<Article>;
  comments: Array<Comment>;
  createdAt: Scalars['String'];
  /**  UUID identifier  */
  id: Scalars['ID'];
  /**  Hash of password  */
  password?: Maybe<Scalars['String']>;
  username: Scalars['String'];
};


export type UserCommentsArgs = {
  topLevelOnly?: InputMaybe<Scalars['Boolean']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Article: ResolverTypeWrapper<Article>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Comment: ResolverTypeWrapper<Comment>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Jwt: ResolverTypeWrapper<Jwt>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Article: Article;
  Boolean: Scalars['Boolean'];
  Comment: Comment;
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Jwt: Jwt;
  Mutation: {};
  Query: {};
  String: Scalars['String'];
  User: User;
};

export type ArticleResolvers<ContextType = any, ParentType extends ResolversParentTypes['Article'] = ResolversParentTypes['Article']> = {
  authorId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  comments?: Resolver<Array<ResolversTypes['Comment']>, ParentType, ContextType, Partial<ArticleCommentsArgs>>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  perex?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Comment'] = ResolversParentTypes['Comment']> = {
  articleId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  authorId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  children?: Resolver<Array<ResolversTypes['Comment']>, ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  score?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type JwtResolvers<ContextType = any, ParentType extends ResolversParentTypes['Jwt'] = ResolversParentTypes['Jwt']> = {
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  answerComment?: Resolver<ResolversTypes['Comment'], ParentType, ContextType, RequireFields<MutationAnswerCommentArgs, 'commentId' | 'content'>>;
  createArticle?: Resolver<ResolversTypes['Article'], ParentType, ContextType, RequireFields<MutationCreateArticleArgs, 'content' | 'perex' | 'title'>>;
  createComment?: Resolver<ResolversTypes['Comment'], ParentType, ContextType, RequireFields<MutationCreateCommentArgs, 'articleId' | 'content'>>;
  createUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'password' | 'username'>>;
  deleteArticle?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationDeleteArticleArgs, 'articleId'>>;
  downVoteComment?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationDownVoteCommentArgs, 'commentId'>>;
  login?: Resolver<ResolversTypes['Jwt'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'password' | 'username'>>;
  upVoteComment?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationUpVoteCommentArgs, 'commentId'>>;
  updateArticle?: Resolver<ResolversTypes['Article'], ParentType, ContextType, RequireFields<MutationUpdateArticleArgs, 'articleId'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getArticle?: Resolver<ResolversTypes['Article'], ParentType, ContextType, RequireFields<QueryGetArticleArgs, 'articleId'>>;
  getArticles?: Resolver<Array<ResolversTypes['Article']>, ParentType, ContextType, Partial<QueryGetArticlesArgs>>;
  getComments?: Resolver<Array<ResolversTypes['Comment']>, ParentType, ContextType, Partial<QueryGetCommentsArgs>>;
  getUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryGetUserArgs, 'userId'>>;
  getUsers?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, Partial<QueryGetUsersArgs>>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  articles?: Resolver<Array<ResolversTypes['Article']>, ParentType, ContextType>;
  comments?: Resolver<Array<ResolversTypes['Comment']>, ParentType, ContextType, Partial<UserCommentsArgs>>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  password?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Article?: ArticleResolvers<ContextType>;
  Comment?: CommentResolvers<ContextType>;
  Jwt?: JwtResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};


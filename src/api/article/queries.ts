import {ArticleModel} from '../../database/models';
import {
    QueryGetArticlesArgs,
    QueryGetArticleArgs
} from '../../generated/types';

export const articleQueries = {
    getArticles: async (_parent: unknown, args: QueryGetArticlesArgs): Promise<ArticleModel[]> => {
        let {limit} = args;
        if (!limit || limit > 50) limit = 50;

        return ArticleModel.findAll({
            limit
        });
    },
    getArticle: async (_parent: unknown, args: QueryGetArticleArgs): Promise<object> => {
        return ArticleModel.findOneOrFail({
            where: {id: args.articleId}
        });
    },
};
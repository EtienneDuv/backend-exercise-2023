import {ArticleModel} from '../../database/models';
import {Context} from '../../interfaces';
import {rejectUnauthorized} from '../../services/utils';
import {
    QueryGetArticlesArgs,
    QueryGetArticleArgs
} from '../../generated/types';

export const articleQueries = {
    getArticles: async (_parent: unknown, args: QueryGetArticlesArgs, ctx: object): Promise<ArticleModel[]> => {
        rejectUnauthorized(ctx as Context);

        let {limit} = args;
        if (!limit || limit > 50) limit = 50;

        return ArticleModel.findAll({
            limit
        });
    },
    getArticle: async (_parent: unknown, args: QueryGetArticleArgs, ctx: object): Promise<object> => {
        rejectUnauthorized(ctx as Context);

        return ArticleModel.findOneOrFail({
            where: {id: args.articleId}
        });
    },
};
import {ArticleModel} from './model';
import {Context} from '../../interfaces';
import {rejectUnauthorized} from '../../services/utils';
import {QueryGetArticlesArgs} from '../../generated/types';

export const articleQueries = {
    getArticles: async (_parent: unknown, args: QueryGetArticlesArgs, ctx: object): Promise<object> => {
        rejectUnauthorized(ctx as Context);

        let {limit} = args;
        if (!limit || limit > 50) limit = 50;

        return ArticleModel.findAll({
            limit
        });
    },
};
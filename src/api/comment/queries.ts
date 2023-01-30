import {CommentModel} from '../../database/models';
import {Context} from '../../interfaces';
import {rejectUnauthorized} from '../../services/utils';
import {QueryGetCommentsArgs} from '../../generated/types';

export const commentQueries = {
    getComments: async (_parent: unknown, args: QueryGetCommentsArgs, ctx: object): Promise<object> => {
        rejectUnauthorized(ctx as Context);

        let {limit} = args;
        if (!limit || limit > 50) limit = 50;

        return CommentModel.findAll({
            limit
        });
    },
};
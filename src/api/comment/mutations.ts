import {CommentModel} from './model';
import {Context} from '../../interfaces';
import {rejectUnauthorized} from '../../services/utils';
import {MutationCreateCommentArgs} from '../../generated/types';

export const commentMutations = {
    createComment: async (_parent: unknown, args: MutationCreateCommentArgs, ctx: object): Promise<object> => {
        rejectUnauthorized(ctx as Context);
        const context = ctx as Context;

        return CommentModel.create({
            ...args,
            authorId: context.userId
        });
    },
};
import {CommentModel} from '../../database/models';
import {Context} from '../../interfaces';
import {rejectUnauthorized} from '../../services/utils';
import {
    MutationCreateCommentArgs,
    MutationUpVoteCommentArgs,
    MutationDownVoteCommentArgs,
} from '../../generated/types';

export const commentMutations = {
    createComment: async (_parent: unknown, args: MutationCreateCommentArgs, ctx: object): Promise<object> => {
        rejectUnauthorized(ctx as Context);
        const context = ctx as Context;

        return CommentModel.create({
            ...args,
            authorId: context.userId
        });
    },
    upVoteComment: async (_parent: unknown, args: MutationUpVoteCommentArgs, ctx: object): Promise<boolean> => {
        const context = ctx as Context;
        // Check if comment exists
        const comment = await CommentModel.findOneOrFail({
            where: {id: args.commentId}
        }) as CommentModel;

        await comment.upVote(context.ipAddress);
        return true;
    },
    downVoteComment: async (_parent: unknown, args: MutationDownVoteCommentArgs, ctx: object): Promise<boolean> => {
        const context = ctx as Context;
        // Check if comment exists
        const comment = await CommentModel.findOneOrFail({
            where: {id: args.commentId}
        }) as CommentModel;

        await comment.downVote(context.ipAddress);
        return true;
    },
};
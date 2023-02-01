import {CommentModel} from '../../database/models';
import {Context} from '../../interfaces';
import {rejectUnauthorized} from '../../services/utils';
import {
    MutationCreateCommentArgs,
    MutationUpVoteCommentArgs,
    MutationDownVoteCommentArgs,
    MutationAnswerCommentArgs,
} from '../../generated/types';

export const commentMutations = {
    createComment: async (_parent: unknown, args: MutationCreateCommentArgs, ctx: object): Promise<CommentModel> => {
        rejectUnauthorized(ctx as Context);
        const context = ctx as Context;

        return CommentModel.create({
            ...args,
            authorId: context.userId
        });
    },
    answerComment: async (_parent: unknown, args: MutationAnswerCommentArgs, ctx: object): Promise<CommentModel> => {
        rejectUnauthorized(ctx as Context);
        const context = ctx as Context;

        const parentComment = await CommentModel.findOneOrFail({
            where: {id: args.commentId}
        }) as CommentModel;

        const childComment = await CommentModel.create({
            articleId: parentComment.articleId,
            content  : args.content,
            authorId : context.userId
        });

        await parentComment.addChildComment(childComment.id);

        return childComment;
    },
    upVoteComment: async (_parent: unknown, args: MutationUpVoteCommentArgs, ctx: object): Promise<void> => {
        const context = ctx as Context;
        // Check if comment exists
        const comment = await CommentModel.findOneOrFail({
            where: {id: args.commentId}
        }) as CommentModel;

        await comment.upVote(context.ipAddress);
    },
    downVoteComment: async (_parent: unknown, args: MutationDownVoteCommentArgs, ctx: object): Promise<void> => {
        const context = ctx as Context;
        // Check if comment exists
        const comment = await CommentModel.findOneOrFail({
            where: {id: args.commentId}
        }) as CommentModel;

        await comment.downVote(context.ipAddress);
    },
};
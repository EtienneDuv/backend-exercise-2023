import {ArticleModel, CommentModel, ChildCommentModel, UserModel} from '../../database/models';
import {ArticleCommentsArgs} from '../../generated/types';
import {LooseObject} from '../../interfaces';

export const articleResolvers = {
    comments: async (parent: ArticleModel, args: ArticleCommentsArgs): Promise<CommentModel[]> => {
        const query: LooseObject = {
            where: {articleId: parent.id},
        };

        if (args.topLevelOnly) {
            const articleCommentIds = (await CommentModel.findAll({
                ...query,
                attributes: ['id'],
                raw       : true
            })).map(comment => comment.id);

            const childCommentIds = (await ChildCommentModel.findAll({
                where     : {childId: articleCommentIds},
                attributes: ['childId'],
                raw       : true
            })).map(childComment => childComment.childId);

            const parentCommentIds = articleCommentIds.filter(commentId => {
                return !childCommentIds.includes(commentId);
            });

            query.where.id = parentCommentIds;
        }

        return CommentModel.findAll(query);
    },
    commentCount: async (parent: ArticleModel): Promise<number> => {
        const query: LooseObject = {
            where: {articleId: parent.id},
        };

        return CommentModel.count(query);
    },
    authorUsername: async (parent: ArticleModel): Promise<string> => {
        const query: LooseObject = {
            where: {id: parent.authorId},
        };

        const user = await UserModel.findOneOrFail(query) as UserModel;
        return user.username;
    },
};

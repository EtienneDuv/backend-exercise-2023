import {ArticleModel, CommentModel, ChildCommentModel} from '../../database/models';
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
};

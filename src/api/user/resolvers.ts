import {UserModel, CommentModel, ArticleModel, ChildCommentModel} from '../../database/models';
import {UserCommentsArgs} from '../../generated/types';
import {LooseObject} from 'src/interfaces';

export const userResolvers = {
    comments: async (parent: UserModel, args: UserCommentsArgs): Promise<CommentModel[]> => {
        const query: LooseObject = {where: {authorId: parent.id}};

        if (args.topLevelOnly) {
            const ownedCommentIds = (await CommentModel.findAll({
                ...query,
                attributes: ['id'],
                raw       : true
            })).map(comment => comment.id);

            const childCommentIds = (await ChildCommentModel.findAll({
                where     : {childId: ownedCommentIds},
                attributes: ['childId'],
                raw       : true
            })).map(childComment => childComment.childId);

            const parentCommentIds = ownedCommentIds.filter(commentId => {
                return !childCommentIds.includes(commentId);
            });

            query.where.id = parentCommentIds;
        }

        return CommentModel.findAll(query);
    },
    articles: async (parent: UserModel): Promise<ArticleModel[]> => {
        return ArticleModel.findAll({
            where: {authorId: parent.id}
        });
    },
};
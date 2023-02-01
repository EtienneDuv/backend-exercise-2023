import {UserModel, CommentModel, ArticleModel} from '../../database/models';

export const userResolvers = {
    comments: async (parent: UserModel): Promise<CommentModel[]> => {
        return CommentModel.findAll({
            where: {authorId: parent.id}
        });
    },
    articles: async (parent: UserModel): Promise<ArticleModel[]> => {
        return ArticleModel.findAll({
            where: {authorId: parent.id}
        });
    },
};
import {ArticleModel, CommentModel} from '../../database/models';

export const articleResolvers = {
    comments: async (parent: ArticleModel): Promise<CommentModel[]> => {
        return CommentModel.findAll({
            where: {articleId: parent.id},
        });
    },
};

import {CommentModel, ChildCommentModel} from '../../database/models';

export const commentResolvers = {
    score: async (parent: unknown): Promise<number> => {
        const comment = parent as CommentModel;
        return comment.getScore();
    },
    children: async (parent: unknown): Promise<object[]> => {
        const comment = parent as CommentModel;
        const children = await ChildCommentModel.findAll({
            where: {parentId: comment.id},
            raw  : true
        });
        const childrenId = children.map(el => el.childId);

        return CommentModel.findAll({
            where: {id: childrenId}
        });
    },
};

import {CommentModel, ChildCommentModel, UserModel} from '../../database/models';

export const commentResolvers = {
    score: async (parent: CommentModel): Promise<number> => {
        return parent.getScore();
    },
    children: async (parent: CommentModel): Promise<CommentModel[]> => {
        const children = await ChildCommentModel.findAll({
            where: {parentId: parent.id},
            raw  : true
        });
        const childrenId = children.map(el => el.childId);

        return CommentModel.findAll({
            where: {id: childrenId}
        });
    },
    authorUsername: async (parent: CommentModel): Promise<string> => {
        const author = await UserModel.findOneOrFail({
            where: {id: parent.authorId},
            raw  : true
        }) as UserModel;

        return author.username;
    },
};

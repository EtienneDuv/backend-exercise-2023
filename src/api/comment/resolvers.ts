import {CommentModel} from 'src/database/models';

export const commentResolvers = {
    score: async (parent: unknown): Promise<number> => {
        const comment = parent as CommentModel;
        return comment.getScore();
    },
};

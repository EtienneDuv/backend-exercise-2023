import {ArticleModel} from '../../database/models';
import {Context} from '../../interfaces';
import {rejectUnauthorized} from '../../services/utils';
import {
    MutationCreateArticleArgs,
    MutationUpdateArticleArgs,
    MutationDeleteArticleArgs,
} from '../../generated/types';

export const articleMutations = {
    createArticle: async (_parent: unknown, args: MutationCreateArticleArgs, ctx: object): Promise<object> => {
        rejectUnauthorized(ctx as Context);
        const context = ctx as Context;

        return ArticleModel.create({
            ...args,
            authorId: context.userId
        });
    },
    updateArticle: async (_parent: unknown, args: MutationUpdateArticleArgs, ctx: object) => {
        rejectUnauthorized(ctx as Context);
        const context = ctx as Context;

        const {id, ...payload} = args;

        const article = await ArticleModel.findOneOrFail({
            where: {
                authorId: context.userId,
                id      : id
            }
        });
        await article.update(payload);
        return article.get({plain: true});
    },
    deleteArticle: async (_parent: unknown, args: MutationDeleteArticleArgs, ctx: object) => {
        rejectUnauthorized(ctx as Context);
        const context = ctx as Context;

        const article = await ArticleModel.findOneOrFail({
            where: {id: args.id},
        }) as ArticleModel;

        if (article.authorId !== context.userId) {
            throw new Error('ARTICLE_NOT_OWNED - you are not the owner of the article.');
        }

        await article.destroy();
    },
};
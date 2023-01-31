import {ArticleModel} from '../../src/database/models';
import defaults from './defaults';

export default {
    createArticle: async (overwrite = {}): Promise<string> => {
        const article = await ArticleModel.create({
            ...defaults.defaultArticle,
            ...overwrite
        });

        return article.id;
    }
};

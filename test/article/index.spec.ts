import createArticle from './createArticle.spec';
import deleteArticle from './deleteArticle.spec';

describe('ARTICLE ====================================================', () => {
    describe('Create article', () => createArticle());
    describe('Delete article', () => deleteArticle());
});

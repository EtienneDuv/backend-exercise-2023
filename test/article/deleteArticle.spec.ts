import ctx from '..';
import {jwtSign} from '../../src/services/jwtService';
import {jwtMalformed, jwtInvalid} from '../utils';
const {expect, request, db, data} = ctx;

export default () => {
    let userId = '';
    let articleId = '';
    let jwt = '';
    const deleteArticleMutation = (articleId = data.defaults.defaultArticle.id) => `
        mutation {
            deleteArticle(articleId: "${articleId}") 
        }
    `;

    before(async () => {
        userId = await data.createUser();
        articleId = await data.createArticle();
        jwt = jwtSign(userId, '10s');
    });


    after(async () => {
        await db.UserModel.destroy({
            where: {id: userId}
        });
        await db.ArticleModel.destroy({
            where   : {id: articleId},
            paranoid: false,
        });
    });


    it('should delete an article', async () => {
        await request
            .post('/')
            .send({query: deleteArticleMutation()})
            .set('Authorization', 'Bearer '+jwt);

        const article = await db.ArticleModel.findOneOrFail({
            where   : {id: articleId},
            paranoid: false
        });

        expect(article.deletedAt).to.not.be.eql(null);

        await article.restore();
    });


    it('should fail - article not owned', async () => {
        const newJwt = jwtSign('anotherId', '10s');

        const res = await request
            .post('/')
            .send({query: deleteArticleMutation()})
            .set('Authorization', 'Bearer '+newJwt);

        const body = res._body;

        expect(body).to.have.property('errors');
        expect(body.errors).to.be.an('array');
        expect(body.errors.length).to.be.eql(1);
        expect(body.errors[0])
            .to.have.property('message')
            .eql('ARTICLE_NOT_OWNED - you are not the owner of the article.');
    });

    jwtMalformed(deleteArticleMutation({}));
    jwtInvalid(deleteArticleMutation({}));
};

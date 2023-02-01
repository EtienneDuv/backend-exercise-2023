import ctx from '..';
import {jwtSign} from '../../src/services/jwtService';
import {jwtMalformed, jwtInvalid} from '../utils';
const {expect, request, db, data} = ctx;

export default () => {
    let userId = '';
    let jwt = '';
    const articleIds: string[] = [];
    const createArticleMutation = ({title = 'Title', perex = 'Perex', content = 'Content'}) => `
        mutation {
            createArticle(title: "${title}", perex: "${perex}", content: "${content}") { 
                id content perex title authorId 
            }
        }
    `;

    before(async () => {
        userId = await data.createUser();
        jwt = jwtSign(userId, '10s');
    });


    after(async () => {
        await db.UserModel.destroy({
            where: {id: userId}
        });
        await db.ArticleModel.destroy({
            where   : {id: articleIds},
            paranoid: false
        });
    });


    it('should create a new article', async () => {
        const res = await request
            .post('/')
            .send({query: createArticleMutation({title: 'My first article'})})
            .set('Authorization', 'Bearer '+jwt);

        // From API
        const data = res._body.data.createArticle;

        expect(data.authorId).to.be.eql(userId);
        expect(data.title).to.be.eql('My first article');

        await db.ArticleModel.findOneOrFail({
            where: {id: data.id},
            plain: true
        });

        articleIds.push(data.id);
    });


    it('should fail - username already exists', async () => {
        const res = await request
            .post('/')
            .send({query: createArticleMutation({title: 'My first article'})})
            .set('Authorization', 'Bearer '+jwt);

        const body = res._body;

        expect(body).to.have.property('errors');
        expect(body.errors).to.be.an('array');
        expect(body.errors.length).to.be.eql(1);
        expect(body.errors[0])
            .to.have.property('message')
            .eql('Article name already exists');
    });

    jwtMalformed(createArticleMutation({}));
    jwtInvalid(createArticleMutation({}));
};

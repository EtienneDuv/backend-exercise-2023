import {faker} from '@faker-js/faker'; //https://fakerjs.dev/api/
import {hashPassword} from '../../services/hashService';
import {UserModel} from '../../api/user';
import {ArticleModel} from '../../api/article';
import {CommentModel} from '../../api/comment';

const seed = async () => {
    // ----------------------------------
    // USER
    // ----------------------------------
    const userPayloads = [];
    const password = await hashPassword('password');
    for (let i = 0; i < 5; i++) {
        const username = faker.internet.userName('test');
        userPayloads.push({
            username: username,
            password: password
        });
    }
    const users = await UserModel.bulkCreate(userPayloads);

    const userIds = users
        .map(el => el.get({plain: true}))
        .map(el => el.id);

    // ----------------------------------
    // ARTICLE
    // ----------------------------------
    const articlePayloads = [];
    for (let i = 0; i < 10; i++) {
        articlePayloads.push({
            authorId: faker.helpers.arrayElement(userIds),
            title   : faker.lorem.words(4),
            perex   : faker.lorem.sentence(),
            content : faker.lorem.paragraphs(4),
        });
    }
    const articles = await ArticleModel.bulkCreate(articlePayloads);

    const articleIds = articles
        .map(el => el.get({plain: true}))
        .map(el => el.id);

    // ----------------------------------
    // COMMENT
    // ----------------------------------
    const commentPayloads = [];
    for (let i = 0; i < 15; i++) {
        commentPayloads.push({
            authorId : faker.helpers.arrayElement(userIds),
            articleId: faker.helpers.arrayElement(articleIds),
            content  : faker.lorem.sentence(8),
        });
    }
    await CommentModel.bulkCreate(commentPayloads);
};

console.time('SEED DATABASE');
seed();
console.timeEnd('SEED DATABASE');
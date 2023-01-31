import {faker} from '@faker-js/faker'; //https://fakerjs.dev/api/
import {hashPassword} from '../../services/hashService';
import {
    UserModel,
    ArticleModel,
    CommentModel,
    CommentVoteModel,
} from '../../database/models';

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
    const comments = await CommentModel.bulkCreate(commentPayloads);

    const commentIds = comments
        .map(el => el.get({plain: true}))
        .map(el => el.id);

    // ----------------------------------
    // COMMENT VOTES
    // ----------------------------------
    const commentVotesPayloads = [];
    for (let i = 0; i < 30; i++) {
        commentVotesPayloads.push({
            commentId: faker.helpers.arrayElement(commentIds),
            value    : faker.helpers.arrayElement([1, 1, 1, -1]),
            ip       : faker.internet.ip(),
        });
    }
    await CommentVoteModel.bulkCreate(commentVotesPayloads);
};

console.time('SEED DATABASE');
seed();
console.timeEnd('SEED DATABASE');
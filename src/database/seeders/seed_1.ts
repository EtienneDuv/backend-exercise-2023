import {faker} from '@faker-js/faker'; //https://fakerjs.dev/api/
import {hashPassword} from '../../services/hashService';
import {
    UserModel,
    ArticleModel,
    CommentModel,
    CommentVoteModel,
    ChildCommentModel,
} from '../../database/models';
import {articleContentMarkdown} from './seed_content';

const seed = async () => {
    // ----------------------------------
    // USER
    // ----------------------------------
    const userPayloads = [];
    const password = await hashPassword('userPwd');
    for (let i = 0; i < 5; i++) {
        const username = faker.internet.userName('test');
        userPayloads.push({
            username: username,
            password: password
        });
    }
    userPayloads.push({
        username: 'cypress_account',
        password: await hashPassword('cypress_password')
    });
    const users = await UserModel.bulkCreate(userPayloads);

    console.log('Use one of those to login: ', {
        username: userPayloads.map(el => el.username),
        password: 'userPwd'
    });

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
            content : articleContentMarkdown,
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
    for (let i = 0; i < 30; i++) {
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
    // CHILD COMMENT
    // ----------------------------------
    let promises: Promise<object>[] = [];

    const firstLevelIds = commentIds.slice(0, 10);
    const secondLevelIds = commentIds.slice(10, 20);
    const thirdLevelIds = commentIds.slice(20);

    secondLevelIds.forEach(id => {
        const parentId = faker.helpers.arrayElement(firstLevelIds);
        const parentComment = comments.find(el => el.id==parentId);
        if (!parentComment) throw new Error('Seed error');

        promises.push(
            ChildCommentModel.create({childId: id, parentId}),
            CommentModel.update(
                {articleId: parentComment.articleId},
                {where: {id: id}}
            )
        );
    });
    await Promise.all(promises);
    promises = [];

    thirdLevelIds.forEach(id => {
        const parentId = faker.helpers.arrayElement(secondLevelIds);
        const parentComment = comments.find(el => el.id==parentId);
        if (!parentComment) throw new Error('Seed error');

        promises.push(
            ChildCommentModel.create({childId: id, parentId}),
            CommentModel.update(
                {articleId: parentComment.articleId},
                {where: {id: id}}
            )
        );
    });

    // can't use bulkCreate for some obscure reason
    await Promise.all(promises);

    // ----------------------------------
    // COMMENT VOTES
    // ----------------------------------
    const commentVotesPayloads = [];
    for (let i = 0; i < 50; i++) {
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
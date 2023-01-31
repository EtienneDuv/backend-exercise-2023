export default {
    defaultUser: {
        id      : '00000000-0000-0000-0000-000000000000',
        username: 'testUser',
        // 'testPassword' hashed with dev JWT_SECRET
        password: '$2b$10$4eHD/IYtTfowQznn51183.WarrqZh7I1mHGt4tbyTmq8LJ756nzwW'
    },
    defaultArticle: {
        id      : '11111111-0000-0000-0000-000000000000',
        authorId: '00000000-0000-0000-0000-000000000000',
        title   : 'Default title',
        perex   : 'Default perex',
        content : 'Default content',
    },
};

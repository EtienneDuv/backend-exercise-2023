import ctx from '..';
const {expect, request, db} = ctx;

const loginMutation = (username='testUser', pwd='testPassword') => `
    mutation {
        login(data: {
            username: "${username}",
            password: "${pwd}"
        }) { 
            token 
        }
    }
`;

describe.only('Login user', () => {
    before(async () => {
        await db.UserModel.create({
            username: 'testUser',
            password: '$2b$10$4eHD/IYtTfowQznn51183.WarrqZh7I1mHGt4tbyTmq8LJ756nzwW'
        });
    });


    after(async () => {
        await db.UserModel.destroy({
            where: {username: 'testUser'}
        });
    });


    it('should return JWT token', async () => {
        const res = await request
            .post('/')
            .send({query: loginMutation()});
        const data = res._body.data;

        expect(data)
            .to.have.property('login')
            .to.have.property('token');
        expect(data.login.token.length)
            .to.be.eql(169);
    });


    it('should fail - User not found', async () => {
        const res = await request
            .post('/')
            .send({query: loginMutation('WRONG', 'testPassword')});
        const body = res._body;

        expect(body).to.have.property('errors');
        expect(body.errors).to.be.an('array');
        expect(body.errors.length).to.be.eql(1);
        expect(body.errors[0])
            .to.have.property('message')
            .eql('User not found: \'WRONG\'');
    });


    it('should fail - Password does not match', async () => {
        const res = await request
            .post('/')
            .send({query: loginMutation('testUser', 'WRONG')});
        const body = res._body;

        expect(body).to.have.property('errors');
        expect(body.errors).to.be.an('array');
        expect(body.errors.length).to.be.eql(1);
        expect(body.errors[0])
            .to.have.property('message')
            .eql('Password does not match');
    });
});

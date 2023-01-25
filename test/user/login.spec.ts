import ctx from '..';
const {expect, request, db} = ctx;

describe('Login user', () => {
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
            .send({query: `
                    mutation {
                        login(data: {
                            username: "testUser",
                            password: "testPassword" 
                        }) { token }
                    }
                `});
        const data = res._body.data;

        expect(data)
            .to.have.property('login')
            .to.have.property('token');
        expect(data.login.token.length)
            .to.be.eql(169);
    });


    it('should fail to login - User not found', async () => {
        const res = await request
            .post('/')
            .send({query: `
                mutation {
                    login(data: {
                        username: "WRONG",
                        password: "testPassword" 
                    }) { token }
                }
            `});
        const body = res._body;

        expect(body).to.have.property('errors');
        expect(body.errors).to.be.an('array');
        expect(body.errors.length).to.be.eql(1);
        expect(body.errors[0])
            .to.have.property('message')
            .eql('User not found: \'WRONG\'');
    });


    it('should fail to login - Password does not match', async () => {
        const res = await request
            .post('/')
            .send({query: `
                mutation {
                    login(data: {
                        username: "testUser",
                        password: "WRONG" 
                    }) { token }
                }
            `});
        const body = res._body;

        expect(body).to.have.property('errors');
        expect(body.errors).to.be.an('array');
        expect(body.errors.length).to.be.eql(1);
        expect(body.errors[0])
            .to.have.property('message')
            .eql('Password does not match');
    });
});

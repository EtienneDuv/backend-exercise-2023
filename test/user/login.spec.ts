import ctx from '..';
const {expect, request, db, data} = ctx;

const loginMutation = (username='testUser', pwd='testPassword') => `
    mutation {
        login(username: "${username}", password: "${pwd}") { 
            token 
        }
    }
`;

describe('Login user', () => {
    let id = '';
    before(async () => {
        id = await data.createUser();
    });


    after(async () => {
        await db.UserModel.destroy({
            where: {id}
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

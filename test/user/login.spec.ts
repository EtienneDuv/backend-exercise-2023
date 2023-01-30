import ctx from '..';
const {expect, request, db, data} = ctx;

export default () => {
    let id = '';
    const loginMutation = ({username='testUser', password='testPassword'}) => `
        mutation {
            login(username: "${username}", password: "${password}") { 
                token 
            }
        }
    `;

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
            .send({query: loginMutation({})});
        const data = res._body.data;

        expect(data)
            .to.have.property('login')
            .to.have.property('token');
        expect(data.login.token.length)
            .to.be.eql(169);

        const jwtRegex = /^([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_\-+/=]*)/;
        expect(jwtRegex.test(data.login.token)).to.be.eql(true);
    });


    it('should fail - User not found', async () => {
        const res = await request
            .post('/')
            .send({query: loginMutation({username: 'WRONG'})});
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
            .send({query: loginMutation({password: 'WRONG'})});
        const body = res._body;

        expect(body).to.have.property('errors');
        expect(body.errors).to.be.an('array');
        expect(body.errors.length).to.be.eql(1);
        expect(body.errors[0])
            .to.have.property('message')
            .eql('Password does not match');
    });
};

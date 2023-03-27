import ctx from '..';
import {randInt} from '../../src/services/utils';
const {expect, request, db} = ctx;

export default () => {
    const username = 'testUser'+randInt();
    const createUserMutation = (username: string, pwd='testPassword') => `
        mutation {
            createUser(username: "${username}", password: "${pwd}") {
                id,
                username,
                createdAt,
            }
        }
    `;

    after(async () => {
        await db.UserModel.destroy({
            where: {username}
        });
    });


    it('should create a new user', async () => {
        let res = await request
            .post('/')
            .send({query: createUserMutation(username)});

        // From API
        let data1 = res._body.data;
        expect(data1).to.have.property('createUser');
        data1 = data1.createUser;
        expect(data1).to.have.keys('id', 'username', 'createdAt');

        // From DB
        res = await db.UserModel.findOne({
            where: {username: username}
        });
        const data2 = res.get({plain: true});

        expect(data2.id).to.be.eql(data1.id);
        expect(data2.username).to.be.eql(data1.username);
        expect(String(new Date(data2.createdAt).getTime())).to.be.eql(data1.createdAt);
    });


    it('should fail - username already exists', async () => {
        const res = await request
            .post('/')
            .send({query: createUserMutation(username)})
            .set('Accept', 'application/json');

        const body = res._body;

        expect(body).to.have.property('errors');
        expect(body.errors).to.be.an('array');
        expect(body.errors.length).to.be.eql(1);
        expect(body.errors[0])
            .to.have.property('message')
            .eql('Username already exists');
    });
};

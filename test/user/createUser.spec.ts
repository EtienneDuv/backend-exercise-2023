import ctx from '..';
import {randInt} from '../../src/services/utils';
const {expect, request, db} = ctx;

const username = 'testUser'+randInt();

describe('Create user', () => {
    after(async () => {
        await db.UserModel.destroy({
            where: {username}
        });
    });


    it('should create a new user', async () => {
        let res = await request
            .post('/')
            .send({query: `
                    mutation {
                        createUser(data: { 
                            username: "${username}",
                            password: "testPassword" 
                        }) {
                            id
                            username
                            createdAt
                        }
                    }
                `});

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
        expect(data2.createdAt).to.be.eql(data1.createdAt);
    });


    it('should fail - username already exists', async () => {
        const res = await request
            .post('/')
            .send({query: `
                    mutation {
                        createUser(data: { 
                            username: "${username}",
                            password: "testPassword" 
                        }) {
                            id,
                            username,
                            createdAt,
                        }
                    }
                `})
            .set('Accept', 'application/json');

        const body = res._body;

        expect(body).to.have.property('errors');
        expect(body.errors).to.be.an('array');
        expect(body.errors.length).to.be.eql(1);
        expect(body.errors[0])
            .to.have.property('message')
            .eql('Username already exists');
    });
});

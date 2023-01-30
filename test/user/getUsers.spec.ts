import ctx from '..';
import {jwtSign} from '../../src/services/jwtService';
const {expect, request, db} = ctx;

const getUsersQuery = (params = '') => `
    query { 
        getUsers ${params ? '('+params+')' : ''} { 
            username 
        }
    }
`;

describe('Get users', () => {
    let jwt: string;
    const usernames: string[] = [];

    before(async () => {
        await db.UserModel.destroy({
            where: {username: usernames}
        });
        for (let i=0; i < 55; i++) {
            usernames.push('testUser'+i);
        }

        // Create more than 50 users to test default limit
        await db.UserModel.bulkCreate(
            usernames.map(username => ({
                username: username,
                password: 'pwd'
            }))
        );

        jwt = jwtSign('someUserId', '10s');
    });


    after(async () => {
        await db.UserModel.destroy({
            where: {username: usernames}
        });
    });


    it('should return users - normal', async () => {
        const res = await request
            .post('/')
            .send({query: getUsersQuery()})
            .set('Authorization', 'Bearer '+jwt);

        let data = res._body.data;
        expect(data).to.have.property('getUsers');
        data = data.getUsers;
        expect(data).to.be.an('array');
        expect(data.length).to.be.eql(50);
    });


    it('should return users - limit', async () => {
        const res = await request
            .post('/')
            .send({query: getUsersQuery('limit: 2')})
            .set('Authorization', 'Bearer '+jwt);

        const data = res._body.data.getUsers;
        expect(data).to.be.an('array');
        expect(data.length).to.be.eql(2);
    });


    it('should fail - jwt malformed', async () => {
        const res = await request
            .post('/')
            .send({query: getUsersQuery()})
            .set('Authorization', 'Bearer WRONG_JWT');
        expect(res._body.errors[0].message)
            .to.be.eql('Context creation failed: jwt malformed');
    });


    it('should fail - invalid token', async () => {
        const jwt = 'a'.repeat(36) +'.'+ 'b'.repeat(42) +'.'+ 'c'.repeat(36);

        const res = await request
            .post('/')
            .send({query: getUsersQuery()})
            .set('Authorization', 'Bearer '+jwt);

        expect(res._body.errors[0].message)
            .to.be.eql('Context creation failed: invalid token');
    });
});

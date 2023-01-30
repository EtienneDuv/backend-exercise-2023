import ctx from '..';
import {jwtSign} from '../../src/services/jwtService';
import {jwtMalformed, jwtInvalid} from '../utils';
const {expect, request, db, data} = ctx;

export default () => {
    let jwt: string;
    let createdIds: string[] = [];
    const getUsersQuery = (params = '') => `
        query { 
            getUsers ${params ? '('+params+')' : ''} { 
                username 
            }
        }
    `;

    before(async () => {
        createdIds = await data.createUsers(60);
        jwt = jwtSign('someUserId', '10s');
    });


    after(async () => {
        await db.UserModel.destroy({
            where: {id: createdIds}
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

    jwtMalformed(getUsersQuery());
    jwtInvalid(getUsersQuery());
};

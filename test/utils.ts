import ctx from './';
const {expect, request} = ctx;

export const jwtMalformed = (query: string) => {
    return it('should fail - jwt malformed', async () => {
        const res = await request
            .post('/')
            .send({query: query})
            .set('Authorization', 'Bearer WRONG_JWT');
        expect(res._body.errors[0].message)
            .to.be.eql('Context creation failed: jwt malformed');
    });
};

export const jwtInvalid = (query: string) => {
    return it('should fail - invalid token', async () => {
        const jwt = 'a'.repeat(36) +'.'+ 'b'.repeat(42) +'.'+ 'c'.repeat(36);

        const res = await request
            .post('/')
            .send({query: query})
            .set('Authorization', 'Bearer '+jwt);

        expect(res._body.errors[0].message)
            .to.be.eql('Context creation failed: invalid token');
    });
};

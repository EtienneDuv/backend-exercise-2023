import createUser from './createUser.spec';
import getUsers from './getUsers.spec';
import login from './login.spec';

describe('USER =======================================================', () => {
    describe('Create user', () => createUser());
    describe('Get users', () => getUsers());
    describe('Login user', () => login());
});

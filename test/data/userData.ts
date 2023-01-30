import {UserModel} from '../../src/api/user';
import defaults from './defaults';

export default {
    createUsers: async (number: number): Promise<string[]> => {
        const usernames: string[] = [];

        for (let i=0; i < number; i++) usernames.push('testUser'+i);

        const users = await UserModel.bulkCreate(
            usernames.map(username => ({
                username: username,
                password: 'pwd'
            }))
        );

        return users
            .map(user => user.get({plain: true}))
            .map(user => user.id);
    },
    createUser: async (overwrite = {}): Promise<string> => {
        const user = await UserModel.create({
            ...defaults.defaultUser,
            ...overwrite
        });

        return user.id;
    }
};

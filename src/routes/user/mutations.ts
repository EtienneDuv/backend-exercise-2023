import {sequelize} from '../../database';

interface USER_PAYLOAD {
    username: string;
    password: string;
}
interface CREATE_USER {
    data: USER_PAYLOAD
}

export const userMutations = {
    createUser: (_parent: unknown, args: CREATE_USER): Promise<object> => {
        return sequelize.models.User.create({
            ...args.data
        });
    },
    // TODO authentication
    login: (_parent: object, args: object): object => {
        console.log(args);
        return {
            id       : '64c68e4c6sd54fx8g67',
            username : 'EtienneDuv',
            createdAt: new Date(),
        };
    }
};
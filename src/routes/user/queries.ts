import {UserModel} from './model';

interface GET_USERS {
    limit: number | undefined
}

export const userQueries = {
    getUsers: (_parent: unknown, args: GET_USERS): Promise<UserModel[]> => {
        let {limit} = args;
        if (!limit || limit > 50) limit = 50;
        return UserModel.findAll({
            limit,
            attributes: ['id', 'username', 'createdAt']
        });
    }
};

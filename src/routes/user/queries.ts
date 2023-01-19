import {sequelize} from '../../database';

interface GET_USERS {
    limit: number | undefined
}

export const userQueries = {
    getUsers: (_parent: unknown, args: GET_USERS): Promise<object[]> => {
        let {limit} = args;
        if (!limit || limit > 50) limit = 50;
        return sequelize.models.User.findAll({
            limit
        });
    }
};

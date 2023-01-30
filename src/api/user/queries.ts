import {UserModel} from '../../database/models';
import {Context} from '../../interfaces';
import {QueryGetUsersArgs} from '../../generated/types';
import {rejectUnauthorized} from '../../services/utils';

export const userQueries = {
    getUsers: (_parent: unknown, args: QueryGetUsersArgs, ctx: object): Promise<UserModel[]> => {
        rejectUnauthorized(ctx as Context);

        let {limit} = args;
        if (!limit || limit > 50) limit = 50;

        return UserModel.findAll({
            limit,
            attributes: ['id', 'username', 'createdAt']
        });
    }
};

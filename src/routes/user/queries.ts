import {UserModel} from './model';
import {GetUsers, Context} from '../../interfaces';
import {rejectUnauthorized} from '../../services/utils';

export const userQueries = {
    getUsers: (_parent: unknown, args: GetUsers, ctx: object): Promise<UserModel[]> => {
        rejectUnauthorized(ctx as Context);

        let {limit} = args;
        if (!limit || limit > 50) limit = 50;
        return UserModel.findAll({
            limit,
            attributes: ['id', 'username', 'createdAt']
        });
    }
};

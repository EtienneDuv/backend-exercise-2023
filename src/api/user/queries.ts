import {UserModel} from '../../database/models';
import {Context} from '../../interfaces';
import {rejectUnauthorized} from '../../services/utils';
import {
    QueryGetUsersArgs,
    QueryGetUserArgs
} from '../../generated/types';

export const userQueries = {
    getUsers: (_parent: unknown, args: QueryGetUsersArgs, ctx: object): Promise<UserModel[]> => {
        rejectUnauthorized(ctx as Context);

        let {limit} = args;
        if (!limit || limit > 50) limit = 50;

        return UserModel.findAll({
            limit,
            attributes: ['id', 'username', 'createdAt']
        });
    },
    getUser: (_parent: unknown, args: QueryGetUserArgs, ctx: object): Promise<object> => {
        rejectUnauthorized(ctx as Context);

        return UserModel.findOneOrFail({
            where     : {id: args.userId},
            attributes: ['id', 'username', 'createdAt']
        });
    },
};

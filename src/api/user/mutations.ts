import {hashPassword, verifyPassword} from '../../services/hashService';
import {jwtSign} from '../../services/jwtService';
import {UserModel} from '../../database/models';
import {MutationCreateUserArgs, MutationLoginArgs, Jwt} from '../../generated/types';

export const userMutations = {
    createUser: async (_parent: unknown, args: MutationCreateUserArgs): Promise<UserModel> => {
        const {username, password} = args;
        const passwordHash = await hashPassword(password);
        return UserModel.create({
            username,
            password: passwordHash
        });
    },
    login: async (_parent: object, args: MutationLoginArgs): Promise<Jwt> => {
        const {username, password} = args;
        const user: UserModel | null = await UserModel.findOne({
            where     : {username},
            attributes: ['id', 'password']
        });

        if (!user) throw new Error(`User not found: '${username}'`);

        const validPassword = await verifyPassword(password, user.password);

        if (!validPassword) throw new Error('Password does not match');

        const token = jwtSign(user.id);

        return {token};
    }
};
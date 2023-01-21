import {hashPassword, verifyPassword} from '../../services/hashService';
import {jwtSign} from '../../services/jwtService';
import {UserModel} from './model';
import {CreateUserOrLogin} from '../../interfaces';

export const userMutations = {
    createUser: async (_parent: unknown, args: CreateUserOrLogin, ctx: object): Promise<object> => {
        const {username, password} = args.data;
        const passwordHash = await hashPassword(password);
        return UserModel.create({
            username,
            password: passwordHash
        });
    },
    login: async (_parent: object, args: CreateUserOrLogin): Promise<object> => {
        const {username, password} = args.data;
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
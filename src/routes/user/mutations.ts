import {hashPassword, verifyPassword} from '../../services/hashService';
import {jwtSign} from '../../services/jwtService';
import {UserModel} from './model';

interface USER_PAYLOAD {
    username: string;
    password: string;
}
interface CREATE_OR_LOGIN {
    data: USER_PAYLOAD
}

export const userMutations = {
    createUser: async (_parent: unknown, args: CREATE_OR_LOGIN): Promise<object> => {
        const {username, password} = args.data;
        const passwordHash = await hashPassword(password);
        return UserModel.create({
            username,
            password: passwordHash
        });
    },
    login: async (_parent: object, args: CREATE_OR_LOGIN): Promise<object> => {
        const {username, password} = args.data;
        const user: UserModel | null = await UserModel.findOne({
            where     : {username},
            attributes: ['id', 'password']
        });

        if (!user) throw new Error(`User not found: '${username}'`);

        console.log(user);

        const validPassword = await verifyPassword(password, user.password);

        if (!validPassword) throw new Error('Password does not match');

        const token = jwtSign(user.id);

        return {token};
    }
};
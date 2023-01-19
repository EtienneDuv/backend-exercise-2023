import {Context} from '../interfaces';

export const rejectUnauthorized = (ctx: Context): void => {
    if (!(ctx && ctx.userId)) {
        throw new Error('UNAUTHORIZED: No JWT token provided.');
    }
};
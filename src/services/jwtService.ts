import jwt from 'jsonwebtoken';
import config from '../config';
import {JwtPayload} from '../interfaces';

export const jwtSign = (userId: string, expiresIn = '1h'): string => {
    const payload = {userId: userId};
    return jwt.sign(payload, config.JWT_SECRET, {noTimestamp: true, expiresIn: expiresIn});
};

export const jwtVerify = (token: string) => {
    return jwt.verify(token, config.JWT_SECRET) as JwtPayload;
};
import {hash, compare} from 'bcrypt';

/**
 * @param {string} password - plain text
 * @return {Promise} -
 */
export const hashPassword = (password: string): Promise<string> => {
    return hash(password, 10);
};

/**
 * @param {string} password - plain text
 * @param {string} hash - stored hash of the password
 * @return {Promise} -
 */
export const verifyPassword = (password: string, hash: string): Promise<boolean> => {
    return compare(password, hash);
};

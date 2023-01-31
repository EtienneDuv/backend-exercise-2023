import {sequelize} from '../database';
import {getFilePaths} from '../services/fileService';

/**
 * Creates tables, ignore if already existed.
 * Used for dev only
 * @return {Promise} -
 */
export const createTables = async () => {
    return sequelize.sync();
};

/**
* Creates tables, dropping it first if it already existed.
* Used for dev only
* @return {Promise} -
*/
export const truncateTables = async () => {
    return sequelize.sync({force: true});
};

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

export const models = (() => {
    let models = {};
    getFilePaths('src/api')
        .filter(path => path.endsWith('model.ts'))
        .map(path => require(path))
        .forEach(model => {
            models = {...models, ...model};
        });
    return models;
})();

import {Sequelize, Model} from 'sequelize';
import config from '../config';
import {getFilePaths} from '../services/fileService';

const {
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_PORT,
    POSTGRES_LOGGING,
} = config;

export const sequelize = new Sequelize(POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, {
    host   : POSTGRES_HOST,
    dialect: 'postgres',
    port   : POSTGRES_PORT,
    logging: POSTGRES_LOGGING
});

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

export const models = () => {
    let models = {};
    getFilePaths('src/api')
        .filter(path => path.endsWith('model.ts'))
        .map(path => require(path))
        .forEach(model => {
            models = {...models, ...model};
        });
    return models;
};

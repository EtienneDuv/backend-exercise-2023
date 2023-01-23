import {Sequelize} from 'sequelize';
import config from '../config';

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
 * Creates tables, dropping it first if it already existed.
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
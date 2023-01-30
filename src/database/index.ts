import {Sequelize, Model} from 'sequelize';
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
 * SequelizeWrapper BaseModel
 * @class CustomModel
 */
export class CustomModel extends Model {
    /**
     * Search for a single instance or fail
     * @param  {Object} options - A hash of options to describe the scope of the search
     * @return {Promise} - Model instance
     */
    static async findOneOrFail (options = {}) {
        return this.findOne(options).then(result => {
            if (!result) {
                throw new Error(`Resource ${this.name} not found. Options: ` + JSON.stringify(options));
            }
            return result;
        });
    }
}

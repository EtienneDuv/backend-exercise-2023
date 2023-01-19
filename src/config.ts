import dotenv from 'dotenv';

dotenv.config();

// Interface to load env variables
// Note these variables can possibly be undefined
// as someone could skip these variables or not setup a .env file at all

interface ENV {
  APP_PORT: number|undefined;
  POSTGRES_HOST: string|undefined;
  POSTGRES_USER: string|undefined;
  POSTGRES_PASSWORD: string|undefined;
  POSTGRES_DB: string|undefined;
  POSTGRES_PORT: number|undefined;
  POSTGRES_LOGGING: boolean|undefined;
}

interface Config {
  APP_PORT: number;
  POSTGRES_HOST: string;
  POSTGRES_USER: string;
  POSTGRES_PASSWORD: string;
  POSTGRES_DB: string;
  POSTGRES_PORT: number;
  POSTGRES_LOGGING: boolean;
}

// Loading process.env as ENV interface
const getConfig = (): ENV => {
    return {
        APP_PORT         : Number(process.env.APP_PORT),
        POSTGRES_PORT    : Number(process.env.POSTGRES_PORT),
        POSTGRES_HOST    : process.env.POSTGRES_HOST,
        POSTGRES_USER    : process.env.POSTGRES_USER,
        POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
        POSTGRES_DB      : process.env.POSTGRES_DB,
        POSTGRES_LOGGING : process.env.POSTGRES_LOGGING === 'true' ? true : false,
    };
};

// Throwing an Error if any field was undefined we don't
// want our app to run if it can't connect to DB and ensure
// that these fields are accessible. If all is good return
// it as Config which just removes the undefined from our type
// definition.
const getSanitizedConfig = (config: ENV): Config => {
    for (const [key, value] of Object.entries(config)) {
        if (value === undefined) {
            throw new Error(`Missing key ${key} in config.env`);
        }
    }
    return config as Config;
};

const config = getConfig();
const sanitizedConfig = getSanitizedConfig(config);

export default sanitizedConfig;

const dotenv = require('dotenv');

// NODE_ENV needs to be specified out of env file in dev to load the right file
// hence the -- dev arg
if (process.argv.includes('dev')) {
    dotenv.config({path: '.env.dev'});
    process.env.NODE_ENV = 'dev';
}
else {
    dotenv.config({path: '.env'});
}

module.exports = {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host    : process.env.POSTGRES_HOST,
    dialect : 'postgres'
}
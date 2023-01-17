import {Pool} from 'pg';

// uses default env variables: PGUSER PGHOST PGPASSWORD PGDATABASE PGPORT
const pool = new Pool();

export default {
    dbQuery: (sql: string) => pool.query(sql),
};

import {sequelize} from '..';
import {readFileSync} from 'fs';
import {resolve} from 'path';

const migrate = async () => {
    const sqlPath = resolve(__dirname, './dbSchema.sql');
    const query = readFileSync(sqlPath).toString('utf-8');
    await sequelize.query(query);
};

console.time('CREATE TABLES');
migrate();
console.timeEnd('CREATE TABLES');
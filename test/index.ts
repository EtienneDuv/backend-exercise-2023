import {expect, assert} from 'chai';
import supertest from 'supertest';

import config from '../src/config';
import {models} from '../src/services/databaseService';
import dataGenerationMethods from './data';

const url = `http://${process.env.APP_HOST||'localhost'}:${config.APP_PORT}/`;
const request = supertest(url);

interface LooseObject {
    [key: string]: any
}

export default {
    assert,
    expect,
    request,
    db: {
        ...models
    },
    data: dataGenerationMethods
} as LooseObject;

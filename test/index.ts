import {expect, assert} from 'chai';
import supertest from 'supertest';

import config from '../src/config';
import {UserModel} from '../src/api/user/model';

const url = `http://localhost:${config.APP_PORT}/`;
const request = supertest(url);

interface LooseObject {
    [key: string]: any
}

export default {
    assert,
    expect,
    request,
    db: {
        UserModel
    },
} as LooseObject;

import {expect, assert} from 'chai';
import supertest from 'supertest';

import config from '../src/config';
import dataGenerationMethods from './data';
import {LooseObject} from '../src/interfaces';
import {
    UserModel,
    ArticleModel,
    CommentModel,
} from '../src/database/models';

const url = `http://${process.env.APP_HOST||'localhost'}:${config.APP_PORT}/`;
const request = supertest(url);

export default {
    assert,
    expect,
    request,
    db: {
        UserModel,
        ArticleModel,
        CommentModel,
    },
    data: dataGenerationMethods
} as LooseObject;

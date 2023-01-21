import {ApolloServer} from '@apollo/server';
import {expressMiddleware} from '@apollo/server/express4';
import {ApolloServerPluginDrainHttpServer} from '@apollo/server/plugin/drainHttpServer';
import cors from 'cors';
import {json} from 'body-parser';
import express from 'express';
import http from 'http';

import {sequelize, createTables, truncateTables} from './database';
import {typeDefs, resolvers} from './api';
import config from './config';
import {jwtVerify} from './services/jwtService';

const main = async () => {
    const app = express();
    const httpServer = http.createServer(app);

    // SET UP APOLLO SERVER
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({httpServer})],
    });
    await server.start();

    app.use(
        cors(),
        json(),
        express.urlencoded({extended: true}),
        expressMiddleware(server, {
            // ADDS userId IN Context IF VALID JWT PROVIDED
            context: async ({req}) => {
                if (req.body.operationName === 'IntrospectionQuery') return {};
                if (!(req.headers && req.headers.authorization)) return {};

                const {0: bearer, 1: token} = req.headers.authorization.split(' ');
                if (!(bearer === 'Bearer')) return {};

                const jwtData = jwtVerify(token);
                if (!jwtData) return {};

                return {userId: jwtData.userId};
            }
        }),
    );

    // CHECK POSTGRESQL CONNECTION
    await sequelize.authenticate();
    await createTables();
    // await truncateTables();

    const {APP_PORT} = config;
    httpServer.listen({port: APP_PORT}, () => {
        console.log(`Example app listening at http://localhost:${APP_PORT}`);
    });
};

main();

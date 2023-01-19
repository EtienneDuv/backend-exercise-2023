import {ApolloServer} from '@apollo/server';
import {expressMiddleware} from '@apollo/server/express4';
import {ApolloServerPluginDrainHttpServer} from '@apollo/server/plugin/drainHttpServer';
import cors from 'cors';
import {json} from 'body-parser';
import express from 'express';
import http from 'http';

import {sequelize, createTables} from './database';
import {typeDefs, resolvers} from './routes';
import config from './config';

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
            context: async ({req}) => ({token: req.headers.token}),
        }),
    );

    // CHECK POSTGRESQL CONNECTION
    await sequelize.authenticate();
    await createTables();

    const {APP_PORT} = config;
    await new Promise((resolve) => {
        httpServer.listen({port: APP_PORT}, resolve);
        console.log(`Example app listening at http://localhost:${APP_PORT}`);
    });
};

main();

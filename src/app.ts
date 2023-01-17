import {ApolloServer} from '@apollo/server';
import {expressMiddleware} from '@apollo/server/express4';
import {ApolloServerPluginDrainHttpServer} from '@apollo/server/plugin/drainHttpServer';
import cors from 'cors';
import {json} from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';
import http from 'http';
import swaggerUi from 'swagger-ui-express';

import swaggerDocument from '../api-example.json';
import typeDefs from './typeDefs';
import resolvers from './resolvers';

const main = async () => {
    dotenv.config();
    const app = express();
    const httpServer = http.createServer(app);

    // Set up Apollo Server
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

    const {port} = process.env;
    await new Promise((resolve) => {
        httpServer.listen({port}, resolve);
        console.log(`Example app listening at http://localhost:${port}`);
    });
};

main();

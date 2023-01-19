import {ApolloServer} from '@apollo/server';
import {expressMiddleware} from '@apollo/server/express4';
import {ApolloServerPluginDrainHttpServer} from '@apollo/server/plugin/drainHttpServer';
import cors from 'cors';
import {json} from 'body-parser';
import express from 'express';
import http from 'http';

import {typeDefs, resolvers} from './routes';

const main = async () => {
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

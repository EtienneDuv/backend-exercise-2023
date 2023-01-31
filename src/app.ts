import {ApolloServer} from '@apollo/server';
import {expressMiddleware} from '@apollo/server/express4';
import {ApolloServerPluginDrainHttpServer} from '@apollo/server/plugin/drainHttpServer';
import cors from 'cors';
import {json} from 'body-parser';
import express from 'express';
import http from 'http';
import ip from 'ip';

import {sequelize} from './database';
import {typeDefs, resolvers} from './api';
import config from './config';
import {jwtVerify} from './services/jwtService';
import {Context} from './interfaces';

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
            // Adds userId in Context if valid jwt provided
            context: async ({req}) => {
                const ctx: Context = {
                    ipAddress: ip.address()
                };
                if (req.body.operationName === 'IntrospectionQuery') return ctx;
                if (!(req.headers && req.headers.authorization)) return ctx;

                const {0: bearer, 1: token} = req.headers.authorization.split(' ');
                if (!(bearer === 'Bearer')) return ctx;

                let jwtData;
                try {
                    jwtData = jwtVerify(token);
                } catch (error) {
                    if (error instanceof Error) {
                        if (error.name === 'TokenExpiredError') return ctx;
                        throw error;
                    }
                }

                if (!jwtData) return ctx;

                ctx.userId = jwtData.userId;
                return ctx;
            }
        }),
    );

    // CHECK POSTGRESQL CONNECTION
    await sequelize.authenticate();

    const {APP_PORT, NODE_ENV} = config;
    httpServer.listen({port: APP_PORT}, () => {
        const port = NODE_ENV==='dev'
            ? APP_PORT
            : process.env.CONTAINER_PORT;
        console.log(`Example app listening at http://localhost:${port}`);
    });
};

main();

import express, { Application } from 'express';
import cors from 'cors';
import compression from 'compression';
import { ApolloServer } from 'apollo-server-express';
import { createServer, Server as HttpServer } from 'http';
import expressPlayGround from 'graphql-playground-middleware-express';


import schema from './schemas';
import { PORT } from './environment/environment';


class Server {
    private app: Application;
    private port: number;
    private static _instance: Server;
    private server: ApolloServer;
    private httpServer: HttpServer;


    private constructor() {
        this.app = express();
        this.port = PORT;
        this.middlewares();
        this.server = new ApolloServer({
            schema,
            introspection: true,
            context: async ({ req, connection }): Promise<{ req: any }> => {
                return await { req };
            }
        });
        this.server.applyMiddleware({ app: this.app });
        this.configExpressPlayGround();
        this.httpServer = createServer(this.app);
    }

    private middlewares() {
        this.app.use(cors({ origin: true, credentials: true }));
        this.app.use(compression());
    }

    private configExpressPlayGround() {
        this.app.use('/', expressPlayGround({
            endpoint: '/graphql'
        }));
    }

    static get instance() {
        return this._instance || (this._instance = new this());
    }

    listen() {
        this.httpServer.listen(this.port, () => {
            try {
                console.log(`http://localhost:${this.port}${this.server.graphqlPath}`);
            } catch (err) {
                if (err) throw new Error(err);
            }
        });
    }

}

export default Server;
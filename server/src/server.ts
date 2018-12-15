import "reflect-metadata";
import './controllers/User/UserController';
import * as bodyParser from "body-parser";
import * as express from "express";
import * as morgan from "morgan";
import * as cors from "cors";
import {InversifyExpressServer} from 'inversify-express-utils';
import {MongoDb} from "./config/db/db";
import errorHandler = require("errorhandler");
import expressContainer from './config/di-container/InversifyContainer';




/**
 * The server.
 *
 * @class Server
 */

export class Server {

    /**
     * The express application.
     * @type {Application}
     */

    public app: express.Application;

    /**
     * Bootstrap the application.
     * @static
     */

    public static bootstrap(): Server {
        return new Server();
    }


    /**
     * @constructor
     */

    constructor() {

        //create expressjs application
        let server = new InversifyExpressServer(expressContainer);
        this.app = server
            .setConfig(this.config)
            .setErrorConfig(this.errorConfig)
            .build();
    }

    /**
     * Configure application
     *
     * @class Server
     */

    public async config(app: express.Application) {

        // morgan middleware to log HTTP requests
        app.use(morgan("dev"));

        //use json form parser middleware
        app.use(bodyParser.json());

        //use cors
        app.use(cors());

        //use query string parser middleware
        app.use(bodyParser.urlencoded({
            extended: true
        }));

        // connect to mongoose
        MongoDb.initializeDbConfig();


        //error handling
        app.use(errorHandler());
    }

    public async errorConfig(app: express.Application) {

        //catch 404 and forward to error handler
        app.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
            err.status = 404;
            next(err);
        });
    }
}
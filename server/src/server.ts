import * as bodyParser from "body-parser";
import * as express from "express";
import * as morgan from "morgan";
import * as path from "path";
import errorHandler = require("errorhandler");
import mongoose = require("mongoose");
import * as cors from "cors";
import {UserAPI} from "./api/UserApi";


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
        this.app = express();

        //configure application
        this.config();

        //add api
        this.api();
    }

    /**
     * Create REST API routes
     *
     * @class Server
     */
    public api() {

        let router: express.Router;
        router = express.Router();

        //use cors middleware
        router.use(cors());

        //add your routes
        UserAPI.create(router);

        this.app.use(router);
    }


    /**
     * Configure application
     *
     * @class Server
     */

    public async config() {

        // morgan middleware to log HTTP requests
        this.app.use(morgan("dev"));

        //use json form parser middleware
        this.app.use(bodyParser.json());

        //use query string parser middleware
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));

        // connect to mongoose
        const dbName: string = 'trial-api';
        const uri: string = `mongodb://127.0.0.1:27017/${dbName}`;
        const options: mongoose.ConnectionOptions = {useNewUrlParser: true};

        mongoose.connect(uri, options);
        mongoose.connection.on("error", error => {
            console.error(error);
        });

        //catch 404 and forward to error handler
        this.app.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
            err.status = 404;
            next(err);
        });

        //error handling
        this.app.use(errorHandler());
    }
}
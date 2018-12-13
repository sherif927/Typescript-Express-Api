import * as bodyParser from "body-parser";
import * as express from "express";
import * as morgan from "morgan";
import errorHandler = require("errorhandler");
import * as cors from "cors";
import BaseController from './controllers/BaseController';
import { UserController } from "./controllers/User/UserController";
import { MongoDb } from "./config/db/db";



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
    private userController:BaseController;

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
        //add your routes
        this.mountControllers();
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
        MongoDb.initializeDbConfig();

        //catch 404 and forward to error handler
        this.app.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
            err.status = 404;
            next(err);
        });

        //error handling
        this.app.use(errorHandler());
    }


    /**
     * Mounts all controllers
     *
     * @class Server
     */

    public mountControllers(){
        let userRouter: express.Router;
        userRouter = express.Router();

        //use cors middleware
        userRouter.use(cors());

        //add your routes
        this.userController =new UserController();
        this.userController.initialize(userRouter);

        this.app.use(userRouter);
    }
}
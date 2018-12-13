import * as Mongoose from 'mongoose';
import {MongoError} from 'mongodb';

export class MongoDb {

    //Method to initialize the mongodb client
    public static initializeDbConfig() {
        (<any>Mongoose).Promise = require("bluebird");
        let dbName;
        switch (process.env.NODE_ENV) {
            case "test":
                dbName = process.env.DB_NAME + '-test' || 'trial-api-test';
                break;
            case "production":
                dbName = process.env.DB_NAME || 'trial-api';
                break;
            default:
                dbName = process.env.DB_NAME + '-dev' || 'trial-api-dev';
        }

        //Normalize environment variables and generate DB Uri
        const dbAddress = process.env.DB_HOST || "127.0.0.1";
        const dbPort = process.env.DB_PORT || 27017;
        const uri = `mongodb://${dbAddress}:${dbPort}/${dbName}`;

        const options: Mongoose.ConnectionOptions = {useNewUrlParser: true};

        if (process.env.DB_AUTH === "true") {
            options["user"] = process.env.DB_USER;
            options["pass"] = process.env.DB_PASS;
        }

        Mongoose.connect(uri, options, (err: MongoError) => {
            let message = "Connected To Database Successfully";

            if (err) {
                message = "Error in connecting to the DB, Maybe it's not running?";
                console.error(message);
                process.exit(1);
            }

            console.log(message);
        });
    }
}
import {Request, Response, NextFunction, Router} from 'express';
import {User} from '../models/UserModel';
import {from} from "rxjs";
import {UserInterface as IUser} from "../interfaces/IUser";


/**
 * @class UserAPI
 */
export class UserAPI {
    /**
     * Create the API
     * @static
     */
    public static create(router: Router) {
        router.post('/api/User/', (req: Request, res: Response, next: NextFunction) => {
            new UserAPI().createNewUser(req, res, next);
        });
    }

    /**
     * Creates a New user Document in the Users Collection
     *
     * @param req { Request } request
     * @param res { Response } response
     * @param next { NextFunction } next
     *
     * @return void
     */
    private createNewUser(req: Request, res: Response, next: NextFunction) {
        const user = new User({
            firstName:req.body.name,
            email: req.body.email,
            password: req.body.password,
            customers: []
        });

        //generate necessary constants for error checking and instance creation
        let error = null;

        //check for missing data. Send 400 - malformed request - if field is missing.
        if (!req.body.email || !req.body.password) {

            if (!req.body.email && !req.body.password) error = 'No email or password provided';
            else if (!req.body.email && req.body.password) error = 'No email address provided';
            else error = 'No password provided';

            res.status(400).json({
                Title: "Malformed Request",
                Error: error
            });

            next();
            return;
        }

        //create a new user
        console.log('[Saving] ...');

        //create observables
        const user$ = from(user.save());

        //generate response / handle errors.
        user$.subscribe(
            (user: IUser) => {
                res.status(200).send(user);
            },
            (error) => {
                res.status(404).json({Title: "Malformed: DB request", Error: error});
            },
            () => {
                console.log('[Saved] Created new User');
                next();
                return;
            }
        );
    }
}
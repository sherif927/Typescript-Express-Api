import {Request, Response, NextFunction, Router} from 'express';
import {User} from '../../models/UserModel';
import {from} from "rxjs";
import { inject } from "inversify";
import {TYPES} from "../../config/di-container/types";
import {UserInterface as IUser} from "../../interfaces/IUser";
import BaseController from '../BaseController';
import IUserService from "../../interfaces/IUserService";
import IAuthService from "../../interfaces/IAuthService";


/**
 * @class UserController
 */
export class UserController extends BaseController {

    @inject(TYPES.IUserService) private readonly _userService:IUserService;
    @inject(TYPES.IAuthService) private readonly _authService:IAuthService;

    /**
     * Creates the controller
     */
    initialize(router: Router): void {
        router.post('/api/User/', (req: Request, res: Response, next: NextFunction) => {
            this.createNewUser(req, res, next);
        });
    }

    /**
     * Creates a New user Document in the Users Collection
     *
     * @param req { e.Request }
     * @param res { e.Response }
     * @param next { e.NextFunction }
     *
     * @return void
     */

    private createNewUser(req: Request, res: Response, next: NextFunction) {
        const user = new User({
            firstName: req.body.name,
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
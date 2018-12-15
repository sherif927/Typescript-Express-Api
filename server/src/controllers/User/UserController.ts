import {Request, Response, NextFunction, RequestHandler} from 'express';
import { interfaces, controller, httpGet, httpPost, httpDelete, request, queryParam, response, requestParam } from "inversify-express-utils";
import {User} from '../../models/UserModel';
import {from} from "rxjs";
import { inject } from "inversify";
import {TYPES} from "../../config/di-container/types";
import {UserInterface as IUser} from "../../interfaces/IUser";
import IUserService from "../../interfaces/IUserService";
import IAuthService from "../../interfaces/IAuthService";
import expressContainer from "../../config/di-container/InversifyContainer";


/**
 * @class UserController
 */

@controller('/api/users')
export class UserController{

    constructor(
        @inject(TYPES.IUserService) private userService: IUserService,
        @inject(TYPES.IAuthService) private authService: IAuthService
    ) { }


    @httpGet("/",expressContainer.get<RequestHandler>(TYPES.AuthGuard))
    private async create(@request() req: Request, @response() res: Response) {
        res.status(200).send(this.userService.welcome());
    }


}
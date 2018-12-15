import {Container} from "inversify";
import {TYPES} from "./types";
import {RequestHandler} from 'express';
import {authGuard} from '../../apihelper/middleware/AuthHelper';
import IUserService from '../../interfaces/IUserService';
import IAuthService from '../../interfaces/IAuthService';
import UserService from '../../services/UserService';
import AuthService from '../../services/AuthService';



const expressContainer = new Container();

expressContainer.bind<IUserService>(TYPES.IUserService).to(UserService);
expressContainer.bind<IAuthService>(TYPES.IAuthService).to(AuthService);
expressContainer.bind<RequestHandler>(TYPES.AuthGuard).toConstantValue(authGuard);

export default expressContainer;

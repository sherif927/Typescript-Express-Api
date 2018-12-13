import {Container} from "inversify";
import {TYPES} from "./types";
import IUserService from '../../interfaces/IUserService';
import IAuthService from '../../interfaces/IAuthService';
import UserService from '../../services/UserService';
import AuthService from '../../services/AuthService';

const myContainer = new Container();

myContainer.bind<IUserService>(TYPES.IUserService).to(UserService);
myContainer.bind<IAuthService>(TYPES.IAuthService).to(AuthService);


export {myContainer};

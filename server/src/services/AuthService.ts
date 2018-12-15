import IAuthService from "../interfaces/IAuthService";
import {from} from "rxjs";
import {UserInterface as IUser} from "./../interfaces/IUser";
import { injectable } from "inversify";

/**
 * @class AuthService
 */

@injectable()
export default class AuthService implements IAuthService{}
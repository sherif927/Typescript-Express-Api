import IAuthService from "../interfaces/IAuthService";
import {from} from "rxjs";
import {UserInterface as IUser} from "./../interfaces/IUser";
import { injectable, inject } from "inversify";
import "reflect-metadata";

/**
 * @class AuthService
 */

@injectable()
export default class AuthService implements IAuthService{}
import IUserService from "../interfaces/IUserService";
import {from} from "rxjs";
import {UserInterface as IUser} from "./../interfaces/IUser";
import {injectable} from "inversify";


/**
 * @class UserService
 */

@injectable()
export default class UserService implements IUserService {

    welcome(): string {
        return "Welcome User";
    }
}
import {Router} from "express";
import {authGuard} from '../apihelper/middleware/AuthHelper';

/**
 * @class BaseController
 */

export default abstract class BaseController {

    protected authGuard: any;

    /**
     * @constructor
     *
     */

    constructor() {
        this.authGuard = authGuard;
    }

    /**
     * Initialization method , defines all the methods the controller
     * will be consuming.
     *
     * @param {e.Router} router
     *
     */
    public abstract initialize(router: Router): void;
}
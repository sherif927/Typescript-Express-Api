import * as jwt from 'jsonwebtoken';
import {NextFunction, Request, Response} from "express";

/**
 * Retrieves the JWToken from the authorization header in the incoming
 * request, then verifies is and retrieves the corresponding user
 *
 * @param {e.Request} req
 * @param {e.Response} res
 * @param {e.NextFunction} next
 *
 * @returns {Response}
 */

export const authGuard = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization'];
    if (token) {
        jwt.verify(token, process.env.APPLICATION_SECRET, (err, user: any) => {
            if (err) {
                console.error(err);
                return res.json({
                    success: false,
                    message: 'Failed to authenticate token.'
                });
            } else {
                req.body.user = user._doc;
                next();
            }
        });
    } else {
        return res.status(401).send({
            success: false,
            message: 'Unauthorized'
        });
    }
};
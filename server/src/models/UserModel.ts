import mongoose = require('mongoose');
import { Model, Document } from "mongoose";
import { UserInterface as IUser } from "../interfaces/IUser";
import { userSchema } from "../schemas/UserSchema";

export interface UserModel extends IUser, Document {}

export interface UserModelStatic extends Model<UserModel>{}

export const User = mongoose.model<UserModel, UserModelStatic>('User', userSchema);




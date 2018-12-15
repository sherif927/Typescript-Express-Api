import mongoose = require('mongoose');
import { Model, Document } from "mongoose";
import * as bcrypt from "bcryptjs";
import { UserInterface as IUser } from "../interfaces/IUser";
import { UserSchema } from "../schemas/UserSchema";

export interface UserModel extends IUser, Document {
  comparePassword(candidatePassword: string): Promise<boolean>;
}


UserSchema.pre("save", (next) => {
  bcrypt.hash(this.password, 10, (err, hash) => {
    this.password = hash;
    next();
  });
});

UserSchema.pre("update", (next) => {
  bcrypt.hash(this.password, 10, (err, hash) => {
    this.password = hash;
    next();
  });
});

UserSchema.methods.comparePassword = function (candidatePassword: string): Promise<boolean> {
  let password = this.password;
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, password, (err, success) => {
      if (err) return reject(err);
      return resolve(success);
    });
  });
};

export const User: Model<UserModel> = mongoose.model<UserModel>('User', UserSchema);

export const cleanCollection = () => User.remove({}).exec();


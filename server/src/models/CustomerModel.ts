import mongoose = require('mongoose');
import { Model, Document } from "mongoose";
import { customerSchema } from "../schemas/CustomerSchema";
import { CustomerInterface as ICustomer } from "../interfaces/ICustomer";

export interface CustomerModel extends ICustomer, Document {}

export interface CustomerModelStatic extends Model<CustomerModel>{}

export const Customer = mongoose.model<CustomerModel, CustomerModelStatic>('Customer', customerSchema);
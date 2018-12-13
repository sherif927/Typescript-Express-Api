import mongoose = require('mongoose');
import { Model, Document } from "mongoose";
import { CustomerSchema } from "../schemas/CustomerSchema";
import { CustomerInterface as ICustomer } from "../interfaces/ICustomer";

export interface CustomerModel extends ICustomer, Document { }

export interface CustomerModelStatic extends Model<CustomerModel> { }

export const Customer: Model<CustomerModel> = mongoose.model<CustomerModel, CustomerModelStatic>('Customer', CustomerSchema);
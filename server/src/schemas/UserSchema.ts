import {Schema} from "mongoose";

/**
 User schema that will be used to define its respective model
 */
export var userSchema: Schema = new Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    customers: [{type: Schema.Types.ObjectId, ref: 'Customer'}],
    firstName: {type: String, required: true},
    createdAt: {type: Date, default: Date.now}
});
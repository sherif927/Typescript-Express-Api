import {Schema} from "mongoose";

export interface UserInterface {
    email: string;
    password: string;
    firstName: string;
    created_at?: string;
    customers?:Schema.Types.ObjectId[]
}
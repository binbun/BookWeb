import { Document } from 'mongoose'
import Product from '../models/product'

export interface IProduct extends Document {
    product_id: string;
    title: string;
    price: Number;
    description: string;
    content: string;
    images: Object;
    category: string;
    checked: Boolean;
    sold: Number;
}

export interface ProductArray {
    [index: number]: typeof Product;
}

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    role: Number;
    cart: ProductArray;
    encryptPassword(password: string): Promise<string>;
    validatePassword(password: string): Promise<boolean>;
}

export interface ICategory extends Document {
    name: string;
}

export interface IPayload extends Document {
    _id: string;
    iat: number;
    exp: number;
}
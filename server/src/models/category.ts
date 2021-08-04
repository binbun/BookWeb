import mongoose from 'mongoose';
import { ICategory, IProduct } from "../types/todo";

const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    }
}, {
    timestamps: true
})


const Category = mongoose.model<ICategory>('Category', categorySchema);

export default Category;
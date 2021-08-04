import mongoose from 'mongoose';
import { IUser } from '../types/todo';
import bcrypt from 'bcrypt'

const Schema = mongoose.Schema;

const userSchema = new Schema<IUser>({
  username: {
    type: String
  },
  email: {
    unique: true,
    type: String
  },
  password: {
    unique: true,
    type: String
  },
  role: {
    type: Number, 
    default: 0
  },
  cart: {
    type: Array,
    default: []
  }
}, {
  timestamps: true
})
 
const Users = mongoose.model<IUser>('User', userSchema);

export default Users;
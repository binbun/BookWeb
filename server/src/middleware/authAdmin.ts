import Users from '../models/user'
import { Request, Response, NextFunction } from "express"
import { IGetUserAuthInfoRequest } from "../controllers/users"
import { IUser } from "../types/todo"

const authAdmin = async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) =>{
    try {
        // Get user information by id
        const user = await Users.findOne({
            _id: req.user.id
        })

        if(!user) {
            return res.status(401).json({msg: "Can not find any user with that id"})
        }

        if(user.role === 0)
            return res.status(400).json({msg: "Admin resources access denied"})

        next()
        
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

export default authAdmin
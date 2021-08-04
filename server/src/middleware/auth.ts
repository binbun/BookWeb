const jwt = require('jsonwebtoken')
import { Request, Response, NextFunction } from "express"
import { IGetUserAuthInfoRequest } from "../controllers/users"
import { IUser } from "../types/todo"

const auth = (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) =>{
    try {
        const token = req.header("auth-token")
        
        if(!token) return res.status(400).json({msg: "Invalid Authentication"})

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err: String, user: IUser) {           
            if(err) return res.status(400).json({msg: "Invalid Authentication"})

            req.user = user
            next()
        })
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

export default auth
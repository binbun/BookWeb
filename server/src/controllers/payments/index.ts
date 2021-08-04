import Payments from '../../models/payment'
import Users from '../../models/user'
import Products from '../../models/product'
import { Request, Response, NextFunction } from "express"
import { IProduct } from "../../types/todo"
import { IGetUserAuthInfoRequest } from "../users"

type cartItem = {
    _id: string;
    quantity: number;
    sold: number;
}

const paymentCtrl = {
    getPayments: async(req: Request, res: Response) =>{
        try {
            const payments = await Payments.find()
            res.json(payments)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createPayment: async(req: IGetUserAuthInfoRequest, res: Response) => {
        try {
            const user = await Users.findById(req.user.id).select('name email')
            if(!user) return res.status(400).json({msg: "User does not exist."})

            const {cart, paymentID, address} = req.body;

            const {_id, name, email} = user;

            const newPayment = new Payments({
                user_id: _id, name, email, cart, paymentID, address
            })

            cart.filter((item: cartItem) => {
                return sold(item._id, item.quantity, item.sold)
            })

            
            await newPayment.save()
            res.json({msg: "Payment Succes!"})
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

const sold = async (id: string, quantity: number, oldSold: number) =>{
    await Products.findOneAndUpdate({_id: id}, {
        sold: quantity + oldSold
    })
}

module.exports = paymentCtrl

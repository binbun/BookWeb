const router = require('express').Router()
const cloudinary = require('cloudinary');
import auth from '../middleware/auth'
import authAdmin from '../middleware/authAdmin'
const fs = require('fs')
import { Request, Response } from 'express'

// we will upload image on cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

interface MulterRequest extends Request {
    files: any
}

// Upload image only admin can use
router.post('/upload', (req: MulterRequest, res: Response) =>{
    try {
        if(!req.files || Object.keys(req.files).length === 0)
            return res.status(400).json({msg: 'No files were uploaded.'})
        
        const file = req.files.file;
        if(file.size > 1024*1024) {
            removeTmp(file.tempFilePath)
            return res.status(400).json({msg: "Size too large"})
        }

        if(file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png'){
            removeTmp(file.tempFilePath)
            return res.status(400).json({msg: "File format is incorrect."})
        }

        cloudinary.v2.uploader.upload(file.tempFilePath, {folder: "test"}, async(err: any, result: any)=>{
            if(err) throw err;
            
            res.json({public_id: result.public_id, url: result.secure_url})
        })


    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
})
// Delete image only admin can use
router.post('/destroy', (req: Request, res: Response) =>{
    try {
        const {public_id} = req.body;
        if(!public_id) return res.status(400).json({msg: 'No images Selected'})

        cloudinary.v2.uploader.destroy(public_id, async(err: any, result: any) =>{
            if(err) throw err;

            res.json({msg: "Deleted Image"})
        })

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
    
})


const removeTmp = (path: any) =>{
    fs.unlink(path, (err: any)=>{
        if(err) console.log(err);
    })
}

module.exports = router
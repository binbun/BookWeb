import express, { Express } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'
const fileUpload = require("express-fileupload");

const app: Express = express()

dotenv.config()

app.use(cors());
app.use((express.json()));
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload({useTempFiles: true}));
app.use(cookieParser())

// Routes
app.use('/user', require('./routes/users'))
app.use('/api', require('./routes/categories'))
app.use('/api', require('./routes/upload'))
app.use('/api', require('./routes/products'))
app.use('/api', require('./routes/payments'))

const URI: string = process.env.MONGODB_URL || "mongodb+srv://binbun:crushonli@bookecom.iznxn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongoose.connect(URI,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log('Server running on port: ', port);
});
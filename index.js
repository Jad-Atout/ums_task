import express from 'express';
import userRouter from './src/modules/user/user.js';
import {createDatabaseConnection} from "./db/connection.js";




const app = express();
app.use(express.json());
createDatabaseConnection()

app.use('/users',userRouter)

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})
import express from 'express';
import userRouter from './src/modules/user/user.router.js';
import {createDatabaseConnection} from "./db/connection.js";
import authRouter from './src/modules/authentication/authentication.router.js';
import blogRouter from'./src/modules/blog/blog.router.js'


const app = express();
app.use(express.json());
createDatabaseConnection()

app.use('/users',userRouter)
app.use('/auth',authRouter)
app.use('/blog',blogRouter)

app.listen(8080,()=>{
    console.log("Server is running on port 8080");
})
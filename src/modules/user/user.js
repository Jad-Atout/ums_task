import {Router} from "express";
import userModel from "../../../db/model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const router = Router();

router.get('/',(request, response) => {
    let users = []
    try {
         users = userModel.findAll()
    }catch (error) {
        response.status(500).json({error: error.message});
    }
    return response.status(200).json({message:`success`,users})
})
router.post('/', async (request, response) => {
    const {name, email, password} = request.body;
    const hashedPassword = hashedPassword(password,8);
    await userModel.create({name,email,password:hashedPassword})
    return response.status(201).json({message: "User created successfully"});
})

router.post('/login', async (request, response) => {
    const {email, password} = request.body;
    const user = userModel.findOne({
        where: {email: email},
    })
    if(user==null){
        response.status(404).json({error:"invalid email"});
    }
    const check = await bcrypt.compare(password, user.password);
    if(check===false){
        response.status(401).json({error: "Invalid password"});
    }
    const token = jwt.sign({name:user.name,email:user.email},'JadAtout')
    return response.status(200).json({message:`successfully logged in`,token:token});
})
export default router;
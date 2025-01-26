import {response, Router} from "express";
import userModel from "../../../db/model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const router = Router();

router.get('/',async (request, response) => {
    let users = []
    try {
         users = await userModel.findAll({
             attributes:['name','email']
         })
    }catch (error) {
        response.status(500).json({error: error.message});
    }
    return response.status(200).json({message:`success`,users})
})
router.post('/', async (request, response) => {
    const {name, email, password} = request.body;
    const hashedPassword = await bcrypt.hash(password, 8);
    console.log(hashedPassword);
    await userModel.create({name,email,password:hashedPassword})
    return response.status(201).json({message: "User created successfully"});
})
router.delete('/:id',async (request, response) => {
    const {id}=request.params;
    const{token} = request.headers;

    const decodedToken = jwt.verify(token,'JadAtout');

    if(decodedToken.role !== 'admin'){
        return response.status(403).json({message:"Unauthorized"});
    }

    try {
        const user = await userModel.findByPk(id)
        if(user){
            await user.destroy();
            return response.status(201).json({message:"User deleted",user});
        }else {
            return response.status(404).json({message:"User not found"});
        }
    }catch (error) {
        return response.status(500).json({message:"internal server error",error:error.message});
    }

})


export default router;
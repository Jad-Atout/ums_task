import userModel from "../../../db/model/user.model.js";
import sendEmail from "../../utils/sendEmail.js";
import {registerSchema} from "../authentication/auth.validation.js";
import bcrypt from "bcrypt";


export const getAllUsers= async (req, res) => {
    let users = []
    try {
        users = await userModel.findAll({
            attributes:['name','email']
        })
    }catch (error) {
        req.status(500).json({error: error.message});
    }
    sendEmail()
    return res.status(200).json({message:`success`,users})
}

export const addUser= async (req, res) => {
    const {name, email, password} = req.body;
    const result = registerSchema.validate({name,email,password})
    if(result.error){
        return res.status(400).json({error: result.error.details[0].message});
    }
    const hashedPassword = await bcrypt.hash(password, 8);
    console.log(hashedPassword);
    await userModel.create({name,email,password:hashedPassword})
    return res.status(201).json({message: "User created successfully"});
}

export const deleteUser= async (req, res) => {
    try {
        const {id}=req.params;
        const user = await userModel.findByPk(id)
        if(user){
            await user.destroy();
            return res.status(201).json({message:"User deleted",user});
        }else {
            return res.status(404).json({message:"User not found"});
        }
    }catch (error) {
        return res.status(500).json({message:"internal server error",error:error.message});
    }
}
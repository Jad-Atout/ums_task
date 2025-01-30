import {response, Router} from "express";
import userModel from "../../../db/model/user.model.js";
import bcrypt from "bcrypt";
import auth from "../../middleware/auth.js";
import sendEmail from "../../utils/sendEmail.js";
import cloudinary from "../../utils/cloudinary.js";
import fileUpload from "../../utils/multer.js";
import {loginSchema, registerSchema} from "../authentication/auth.validation.js";
import jwt from "jsonwebtoken";
import {addUser, deleteUser, getAllUsers} from "./user.controller.js";
const router = Router();

router.get('/',getAllUsers)

router.post('/', addUser)

router.delete('/:id',auth(),deleteUser)




router.post('/img',fileUpload().single('image'),async (request, response) => {
    console.log(request.body)
    if(request.image){
        await cloudinary.upload(request.file.path)
        return response.status(201).json({message:`File uploaded successfully`})

    }
    return response.status(404).json({message:"Not Found"});

})

router.post('/login', async (request, response) => {
    try {
        const { email, password } = request.body;

        const result = loginSchema.validate({email:email, password:password},{abortEarly: false});
        if (result.error) {
            return response.status(400).json({ error: result.error });
        }

        const user = await userModel.findOne({ where: { email } });
        if (!user) {
            return response.status(404).json({ error: "Invalid email" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return response.status(401).json({ error: "Invalid password" });
        }


        const token = jwt.sign(
            { name: user.name, email: user.email,role:user.role,id:user.id },
            'JadAtout'
        );

        return response.status(200).json({
            message: "Successfully logged in",
            token
        });
    } catch (error) {
        console.error(error);
        return response.status(500).json({ error: "Internal server error", details: error.message });
    }
});

export default router;
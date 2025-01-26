import {Router} from 'express'
import userModel from "../../../db/model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const router = Router()

router.post('/login', async (request, response) => {
    try {
        const { email, password } = request.body;
        const user = await userModel.findOne({ where: { email } });

        if (!user) {
            return response.status(404).json({ error: "Invalid email" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return response.status(401).json({ error: "Invalid password" });
        }


        const token = jwt.sign(
            { name: user.name, email: user.email,role:user.role },
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




export default router
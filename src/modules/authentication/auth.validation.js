import joi from "joi"

 export const registerSchema = joi.object({
    name:joi.string().min(3).required(),
    email: joi.string().email().required(),
    password: joi.string().required().min(6),
})
export const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required().min(6),
})

import jwt from "jsonwebtoken";
import {response} from "express";

const auth = ()=>{

    return (request,response,next)=>{
        try {
            const {token} = request.headers;
            const decoded = jwt.verify(token,'JadAtout')
            if(decoded.role !='admin'){
                return response.status(401).json({error:"Not authorized"})

            }
            next()
        }catch (err){
            return response.status(401).json({error: "Invalid token"});
        }

    }
}

export default auth;
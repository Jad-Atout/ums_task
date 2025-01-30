import jwt from "jsonwebtoken";
const auth = ()=>{
    return (req,res,next)=>{
        try {
            const {token} = req.headers;
            const decoded = jwt.verify(token,'JadAtout')
            if(decoded.role !=='admin'){
                return res.status(401).json({error:"Not authorized"});
            }
            req.id = decoded.id;
            return next()
        }catch (e) {
            return res.status(401).json({error:"Invalid token"});

        }


    }
}

export default auth
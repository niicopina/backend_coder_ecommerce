import { compareSync } from "bcrypt";
import User from "../models/user.model.js";

export default async function isValidPassword(req,res, next){
    let user = await User.findOne({email: req.body.email})
    if(user){
        let verified = compareSync(
            req.body.password,  //lo que envia cliente en form
            user.password       //lo que esta guardado en mongo
        )
        if(verified){
            return next()
        }
    }
        return res.status(401).json({
            success: false,
            message: 'auth error'
        })
    
}
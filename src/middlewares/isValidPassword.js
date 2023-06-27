import { compareSync } from "bcrypt";
import User from "../models/user.model.js";

export default async function isValidPassword(req,res, next){
    //let user = await User.findOne({email: req.body.email})
    let verified = compareSync(
            req.body.password,  //lo que envia cliente en form
            req.user.password   //lo que esta guardado en mongo
        )
        if(verified){
            return next()
        }
        return res.status(401).json({
            success: false,
            message: 'auth error'
        })
}
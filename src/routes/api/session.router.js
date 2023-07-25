import Router from "./router.js";
import jwt from 'jsonwebtoken'

class SessionRouter extends Router {
    init() {
        this.post('/login', ['PUBLIC'], (req,res)=>{
            let user = {
                email: req.body.email,
                role: 'user'
            }
            let token = jwt.sign(user, 'CoderSecretClassRouter')
            res.sendSuccess({token})
        })
    }
}

module.exports = new SessionRouter()
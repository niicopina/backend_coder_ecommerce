const Router = require("./router.js")
const jwt = require('jsonwebtoken')

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
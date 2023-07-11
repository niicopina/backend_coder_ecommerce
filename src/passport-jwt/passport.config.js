import passport from "passport";
import passportJWT from 'passport-jwt';
import {config} from '../config/config.js'

const JWTStrategy = passportJWT.Strategy
const ExtractJwt = passportJWT.ExtractJwt
coderCookie = SECRET_JWT
let cookieExtractor = req => {
    let token = null
    if(req&&req.cookies){
        token = req.cookies[SECRET_JWT]
    }
}
const configStrategy = {
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey: config.privateKeyJwts
}
const initializePassport = () => {
    passport.use('jwt', new JWTStrategy(configStrategy, async(jwt_payload, done)=>{
        try {
            return done(null, jwt_payload)
        } catch (error) {
            
        }
    }))
}

module.exports = {
    initializePassport
}
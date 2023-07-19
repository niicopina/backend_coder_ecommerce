import passport from "passport";
import GHStrategy from 'passport-github2'
import User from '../models/user.model.js'

const {GH_CLIENT_ID, GH_CLIENT_SECRET} = process.env
const callback = "http://localhost:8000/api/auth/github/callback"

export default function passportGitHub(){
    passport.serializeUser(
        (user,done) => done(null, user._id)
    )
    passport.deserializeUser(async (_id, done) => {
        try {
          const user = await User.findById(_id)
          return done(null, user)
        } catch (error) {
          return done(error)
        }
      })
    passport.use(   //estrategia de registro con github
        'github',
        new GHStrategy(
            {clientID: GH_CLIENT_ID, clientSecret: GH_CLIENT_SECRET, callbackURL: callback},
            async(accessToken,refreshToken,profile,done) => {
                try {
                    console.log(profile)
                    let one = await User.findOne({email:profile._json.login})
                    if(one){
                        return done(null, one)
                    }
                    let user = await User.create({
                        name: profile._json.name,
                        email: profile._json.login,
                        password: 'hola1234',
                        photo: profile._json.avatar_url
                    })
                    return done(null, user)
                } catch (error) {
                    return done(error)
                }
            }
        )
    )
}
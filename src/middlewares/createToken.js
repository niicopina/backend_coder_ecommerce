import jwt from 'jsonwebtoken'

export default(req,res,next)=>{
    let token = jwt.sign(
        {email:req.body.email},
        process.env.SECRET_JWT,
        {expiresIn:60*60*24*7}
    )
    req.token = token
    return next()
}
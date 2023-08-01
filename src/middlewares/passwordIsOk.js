import bcryptjs from 'bcrypt'

export default function passwordIsOk(req,res,next){
    try {
        let db_password = req.user.password
        let form_password = req.body.password
        let compare = bcryptjs.compareSync(form_password, db_password)
        if(compare){
            return next()
        }else{
            return res.status(401).json({
                success: false,
                message: 'invalid credentials'
            })
        }
    } catch (error) {
        next(error)
    }
}
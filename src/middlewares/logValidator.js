export default function validator(req,res,next){
    const {password, email} = req.body
    if(!password || !email){
        return res.status(400).json({
            success: false,
            message: 'password and email are required'
        })
    }else{
        next()
    }
}
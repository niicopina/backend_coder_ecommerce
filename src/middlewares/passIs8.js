export default function passIs8(req,res,next){
    const {password} = req.body
    if(password >= 8){
        next()
    }else{
        return res.status(400).json({
            success: false,
            message: 'Password must have at least 8 characters'
        })
    }
}
function validator(req,res,next){
    if(!req.body.title || !req.body.description || !req.body.price ||
        !req.body.code || !req.body.stock || !req.body.thumbnail){
            return res.status(400).json({success: false, message: 'Complete all fields'})
    }else{
        next()
    }
}
export default validator
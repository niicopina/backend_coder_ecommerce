export default authJwt = role => {
    return async(req,res,next)=>{
        if(!req.user) {
            return res.status(401).send({
                success: false,
                message: 'Unauthorized'
            })
        }
        if(req.user.role !== role){
            return res.status(403).send({
                success: false,
                message: 'Not permission'
            })
        }
        next()
    }
}
import Router from "./router.js";

class UserRouter extends Router{
    init(){
        this.get('/', ['PUBLIC'], async(req,res)=>{
            try {
                res.sendSuccess('hola coder -get de user')
            } catch (error) {
                res.sendServerError(error)
            }
        })
    }
}

export default UserRouter
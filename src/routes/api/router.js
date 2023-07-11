import { Router } from "express";

class RouterClass{
    constructor(){
        this.router = Router()
        this.init()
    }
    getRouter(){
        return this.router
    }
    init(){
    }
    applyCallbacks(callbacks){
        return callbacks.map(callback => async(...params)=>{
            try {
                await callback.apply(this, params)
            } catch (error) {
                console.error(error)
                params[1].status(500).send(error)
            }
        })
    }
    genCustomRes = (req,res,next) => {
        res.sendSuccess = payload => res.send({status: 'success', payload})
        res.sendServerError = error => res.send({status: 'error', error})
        res.sendUserError = error => res.send({status: 'error', error})
        next()
    }
    handlePolicies = policies => (req,res,next) => {
        if(policies[0] === 'PUBLIC'){return next()}
        const authHeader = req.headers.authorization
        if(!authHeader){return res.status(401).send({status: 'error', error: 'Unauthiorized'})}
        const token = authHeader.split(' ')[1]
        let user = jwt.verify(token, 'palabra secreta')
        if(!policies.includes(user.role.toUpperCase())){
            return res.status(403).send({status: 'error', error:'unauthorized'})
        }
        req.user = user
        next()
    }
    get(path, policies, ...callbacks){
        this.router.get(path, this.handlePolicies(policies), this.genCustomRes, this.applyCallbacks(callbacks))
    }
    post(path, policies, ...callbacks){
        this.router.get(path, this.handlePolicies(policies), this.genCustomRes, this.applyCallbacks(callbacks))
    }
    put(path, policies, ...callbacks){
        this.router.get(path, this.handlePolicies(policies), this.genCustomRes, this.applyCallbacks(callbacks))
    }
    delete(path, policies, ...callbacks){
        this.router.get(path, this.handlePolicies(policies), this.genCustomRes, this.applyCallbacks(callbacks))
    }
}

export default RouterClass
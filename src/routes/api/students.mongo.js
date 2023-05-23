import { Router } from "express";
import Student from "../../models/students.model.js";

const router = Router()


router.post('/', 
   async(req,res,next) => {
    try {
        const one = await Student.create(req.body)
        if(one){
            return res.json({
                status: 201,
                message: 'Student created',
                id: one._id
            })
        }
    } catch (error) {
        next(error)
    }
   } 
)
router.get('/',
   async(req,res,next) => {
    try {
        const all = await Student.find().select('name age course')
        if(all){
            return res.json({
                status: 200,
                response: all
            })
        }
    } catch (error) {
        next(error)
    }
   }
)
router.put('/:sid',
   async(req,res,next) => {
    try {
        let one = await Student.findByIdAndUpdate(req.params.sid, req.body)
        if(one){
            return res.json({
                status: 200,
                message: 'updated'
            })
        }
    } catch (error) {
        next(error)
    }
   }
)
router.delete('/:sid',
   async(req,res,next) => {
    try {
        let one = await Student.findByIdAndDelete(req.params.sid, req.body)
        if(one){
            return res.json({
                status: 200,
                message: 'deleted'
            })
        }
    } catch (error) {
        next(error)
    }
   }
)

export default router
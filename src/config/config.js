import mongoose from "mongoose";

exports.config = {
    privateKey: 'palabraSecreta',
    connectDB: async () =>{
        try {
            await mongoose.connect('mongodb+srv://pinanicolasagustin:ellipsis@dbnicopina.wuf76cz.mongodb.net/ecommerce')
        } catch (error) {
            
        }
    }
}
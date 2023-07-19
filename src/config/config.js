import mongoose from "mongoose";
import dotenv from 'dotenv'
import commander from "../utils/commander.js";
import MongoSingleton from "./MongoSingleton.js";

const {mode} = commander.opts()

dotenv.config({
    path: mode === 'development' ? './.env.development' : './.env.production'
})

exports.config = {
    privateKey: process.env.SECRET_JWT,
    port: process.env.PORT || 8000,
    mongo_url: process.env.LINK_MONGO,
    connectDB: async () =>{
        MongoSingleton.getInstance()
        /* try {
            await mongoose.connect('mongodb+srv://pinanicolasagustin:ellipsis@dbnicopina.wuf76cz.mongodb.net/ecommerce')
        } catch (error) {
            console.log('errir de conexion')
        } */
    }
}
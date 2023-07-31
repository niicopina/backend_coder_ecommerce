import mongoose from "mongoose";
import dotenv from 'dotenv'
import commander from "../utils/commander.js";
import MongoSingleton from "./MongoSingleton.js";

const {mode} = commander.opts()

dotenv.config({
    path: mode === 'development' ? './.env.development' : './.env.production'
})

const config = {
    twilio_sid:     process.env.TWILIO_SID,
    twilio_token:   process.env.TWILIO_AUTH_TOKEN,
    twilio_phone:   process.env.TWILIO_PHONE_NUMBER,
    my_phone:       process.env.MY_PHONE_NUMBER,
    gmail_user_app: process.env.GMAIL_USER_APP,
    gmail_pass_app: process.env.GMAIL_PASS_APP,
    privateKey:     process.env.SECRET_JWT,
    port:           process.env.PORT || 8000,
    mongo_url:      process.env.LINK_MONGO,
    connectDB: async () =>{
        MongoSingleton.getInstance()
        /* try {
            await mongoose.connect('mongodb+srv://pinanicolasagustin:ellipsis@dbnicopina.wuf76cz.mongodb.net/ecommerce')
        } catch (error) {
            console.log('errir de conexion')
        } */
    }
}

export default {config}
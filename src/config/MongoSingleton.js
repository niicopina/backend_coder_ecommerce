import mongoose from "mongoose";

class MongoSingleton {
    static #instance

    constructor(){
        mongoose.connect('mongodb+srv://pinanicolasagustin:ellipsis@dbnicopina.wuf76cz.mongodb.net/ecommerce',
        {useNewUrlParser: true,
         useUnifiedTopology: true
        })
    }
    static getInstance(){
        if(this.#instance){
            console.log('Already connected')
            this.#instance
        }
        this.#instance = new MongoSingleton()
        console.log('Connected')
        return this.#instance
    }
}

export default MongoSingleton
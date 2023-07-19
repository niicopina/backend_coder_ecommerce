import mongoose from "mongoose";
import { model, Schema } from "mongoose";

const collection = 'users'
const schema = new Schema({
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    email: {type: String, index: true, unique: true,required: true},
    role: {type: String, default:'user'},
    password: {type: String, required: true},
    cart: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' },
})
const User = model(collection, schema)

export default User
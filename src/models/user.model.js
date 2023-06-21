import { Schema, model } from "mongoose";

const collection = 'users'
const schema = new Schema({
    name: {type: String, required: true},
    photo: {type: String, default: 'https://www.pngitem.com/pimgs/m/227-2271053_usuario-persona-genrico-solo-general-smbolo-user-clipart.png'},
    email: {type: String, index: true, unique: true,required: true},
    age: {type: Number},
    role: {type: Number, default:0},
    password: {type: String, required: true}
})
const User = model(collection, schema)

export default User
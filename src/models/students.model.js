import { model, Schema } from 'mongoose'

let collection = 'students'

const schema = new Schema({
    name: { type: String, required: true},
    lastName: { type: String, required: true},
    age: { type: Number, required: true},
    dni: { type: String, required: true},
    course: { type: String, required: true},
    note: { type: Number, required: true}
})

const Student = model(collection, schema)

export default Student
import { model, Schema, Types } from 'mongoose'

const collection = 'carts'

const schema = new Schema({
    user: { type: Types.ObjectId, required: true, ref: 'users' },
    product_id: { type: Types.ObjectId, required: true, ref: 'products'},
    quantity: { type: Number, required: true},
    active: { type: Boolean}
})

const Cart = model(collection, schema)

export default Cart
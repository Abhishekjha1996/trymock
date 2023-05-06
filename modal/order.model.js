const mongoose = require("mongoose")

const orderschema = mongoose.Schema({
   _id: String,
   user : { type: ObjectId, ref: 'User' },
   books : [{ type: ObjectId, ref: 'Book' }],
totalAmount: Number
})


const Ordermodal = mongoose.model("Order", orderschema)

module.exports={
    Ordermodal
}
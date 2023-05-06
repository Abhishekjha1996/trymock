const mongoose = require("mongoose")

const bookschema = mongoose.Schema({
   _id: String,
   title: String,
   author: String,
   category: String,
   price: Number,
   quantity: Number
},{
    versionKey: false
})


const BookModel = mongoose.model("book", bookschema)

module.exports={
    BookModel
}


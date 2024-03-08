const mongoose = require("mongoose");

const Books = new mongoose.Schema(
    {
        title:{
            type:String,
            required:[true,"title is required"]
        },
        description:{
            type:String,
            required:[true,"description is required"],
            minlength:[5,"description mus be at least 5 characters"],

        },
        addedBy: {
            type: String,
            default: null,
          },
      
    },{timestamps:true}
);


const BooksSchema = mongoose.model("BookSchema",Books)
module.exports = BooksSchema;


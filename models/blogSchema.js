const mongoose = require("mongoose")

const blogSchema= mongoose.Schema({
    title:{
        type:String,
        required:[true,"Please provide a Title for the Blog"]
    },
    Author:{
        type:  mongoose.Schema.Types.ObjectId, 
        ref: 'User',
    },
    owner:{
        type: String,
    },
    Date:{
        type :Date ,
        default : new Date() 
    },
    img:{
        type:String
    },
    desc:{
        type:String,
        required:true
    }
})
const Blog = mongoose.model("blog",blogSchema)
module.exports = Blog
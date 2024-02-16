const mongoose = require("mongoose")

const userSchema= mongoose.Schema({
    name: { 
        type: String,
        required: true 
    },
    email:{
        type: String, 
        required: true 
    },
    password:{
        type :String ,
        required:true
    },
    profilePicture:{
        type:String,
        default:"https://img.freepik.com/vecteurs-premium/profil-avatar-femme-icone-ronde_24640-14042.jpg"
    }
})

const User = mongoose.model("user",userSchema)
module.exports = User
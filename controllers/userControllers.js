const User= require("../models/userSchema")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")



//@desc register role:user
//@Method post  path:/register
//@access public
const register = async(req, res)=>{
    try{
        const {email,name, password}= req.body
        const newUser = await User.findOne({email})
            if (newUser) res.status(400).json({msg: "user exist, try to connect"})
            else{
                const hashedPW = await bcrypt.hash(password, 10)
                const createUser= await User.create({email,name,password:hashedPW})
                const token = jwt.sign({id: createUser._id},process.env.JWT_SECRET,{expiresIn:"60d"})
                console.log(token)
                res.status(201).json({msg:"user created", token:token , user:createUser})
        }
    }catch(error){
        res.status(500).json({msg:"something went wrong",error:error.message})
    }
}


// @desc login role:user
// @Method post  path:/login
// @access public
const login = async(req, res)=>{
    try{
        const {email,password} = req.body
        const user = await User.findOne({email})
        if (!user) res.status(400).json({msg:"user does not exist, try to register"})
        else{
            const checkPW = await bcrypt.compare(password,user.password)
            if(!checkPW)res.status(400).json({msg:"wrong password, try again"})
            const token = jwt.sign({id: user._id},process.env.JWT_SECRET,{expiresIn:"60d"})
        console.log(token)
        res.status(200).json({msg:"login success!", token:token , user:user})
    }
    }catch(error){
        res.status(500).json({msg:"something went wrong",error:error.message})
    }
}



//@desc register role:user
//@Method get  path:/
//@access public
const getUserData = async(req, res)=>{
    try{
        const user = await User.findOne({_id: req.body.userId})
        if(!user) res.status(400).json({msg:"user does not exist, try to register "})
        res.status(200).json({msg:"user info success", user:user})
    }catch(error){
        res.status(500).json({msg:"something went wrong",error:error.message})
    }
}

//delete user account
//@desc delete user data by id
//@method delete /api/delete/:id
const deleteUser= async (req,res) =>{
    try {
        const user = await User.findByIdAndDelete({_id:req.params.id})
        res.status(200).json({msg: "user account deleted",user: user})
    } catch (err){
        res.status(500).json({msg:"something went wrong",err:err.message})
    }
}

//@desc user update role: user
//@methode put path:/blog/updateuser
const updateUser =  async (req,res)  =>{
    try {
        const user = await User.findByIdAndUpdate({_id:req.params.id},req.body,{new:true})
        res.status(200).json({msg: "User updated with success",user: user})
        console.log(blog)
    } catch (err){
        res.status(500).json({msg: err.message})
    }
}

module.exports= {register,login,getUserData,deleteUser,updateUser}
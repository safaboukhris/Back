const express = require ("express")
const router = express.Router()
const{register,login,getUserData,deleteUser,updateUser} = require("../controllers/userControllers")
const authMiddleware = require('../middlewares/authMiddleware')



router.post("/register", register)
router.post("/login", login) 
router.get("/",authMiddleware,getUserData)
router.delete("/deleteuser/:id",authMiddleware,deleteUser)
router.put("/updateuser/:id",authMiddleware,updateUser)


module.exports= router
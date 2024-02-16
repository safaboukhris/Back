const express = require ("express")
const router = express.Router()
const authMiddleware = require('../middlewares/authMiddleware')
const{createBlog,getBlogs,deleteBlog,updatBlog,getAllBlogs,getSingleBlog,getBlogBySearch} = require("../controllers/blogControllers")

router.get('/search',getBlogBySearch)
router.post("/addblog" , authMiddleware , createBlog)
router.get("/getblogs" , authMiddleware , getBlogs)
router.put("/updateblog/:id" , authMiddleware , updatBlog)
router.delete("/deleteblog/:id" , authMiddleware , deleteBlog)
router.get("/getallblogs" , getAllBlogs)
router.get("/:id",getSingleBlog)

module.exports = router
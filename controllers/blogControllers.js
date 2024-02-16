const { Mongoose } = require("mongoose")
const Blog = require("../models/blogSchema")


//@desc blog add role: user
//@methode post path:/blog/addblog
const createBlog = async (req,res)=>{
    newDate= new Date().toISOString()
    try{
        const{title,desc,owner,userId,img}=req.body
        console.log(userId)
        const newBlog=Blog.create({title,desc,newDate,img,owner:userId});
        res.status(201).json({msg:"blog created",newBlog});
    } catch(err){
    res.status(500).json({msg:"something went wrong", err: err.message})
    }
}


//@desc blog find role: user
//@methode post path:/blog/getblogs
const  getBlogs = async (req,res) => {
    try{
        const {userId} = req.body
        console.log(userId)
        const blogs =await Blog.find({owner:userId}).sort({Date:-1});
        res.status(200).json({msg: "get all blogs from the database", blogs})
        console.log(blogs);
    }catch(err){
        res.status(500).json({msg:"something went wrong", err: err.message})
    }
}



//@desc blog delete role: user
//@methode post path:/blog/deleteblog
const deleteBlog = async (req,res) =>{
    try {
        const blog = await Blog.findByIdAndDelete({_id:req.params.id})
        res.status(200).json({msg: "Blog deleted",blog: blog})
    } catch (err){
        res.status(500).json({msg:"something went wrong",err:err.message})
    }
}


//@desc blog update role: user
//@methode put path:/blog/updateblog
const updatBlog =  async (req,res)  =>{
    try {
        const blog = await Blog.findByIdAndUpdate({_id:req.params.id},req.body,{new:true})
        res.status(200).json({msg: "blog updated with success",blog: blog})
        console.log(blog)
    } catch (err){
        res.status(500).json({msg: err.message})
    }
}



//get all blogs for our home page        
const getAllBlogs= async(req,res)=>{
    const{page} = req.query;
    try{
        const limit =3;
        const startIndex = (Number(page)-1)*limit;
        const total = await Blog.countDocuments({});
        const AllBlogs = await Blog.find().sort({Date:-1}).limit(limit).skip(startIndex);
        res.json({
            data: AllBlogs,
            currentPage:Number(page),
            totalBlogs: total,
            numberOfPages: Math.ceil(total/limit)
        })
    }catch(err){
        res.status(500).json({msg: err.message})
    }
}
//get  single blog for our home page
const getSingleBlog= async(req,res)=>{
    const {id} = req.params
    try{
        const SingleBlog = await Blog.findById(id)
        if (!SingleBlog) {
            return res.status(404).json({ msg: 'Blog not found' });
        }
        res.status(200).json({msg:"get single blog !!!!.",SingleBlog})
    }catch(err){
        res.status(500).json({msg: err.message})
    }
}

        // get searched blogs by title
const getBlogBySearch = async (req,res)=>{
    try {
        const searchQuery = req.query.searchQuery;
        const regex = new RegExp(searchQuery, 'i');
        const blogs = await Blog.find({ title: regex });
        res.json({ msg: "Blogs found:", blogs });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
}






module.exports = {createBlog,getBlogs,deleteBlog,updatBlog,getAllBlogs,getSingleBlog,getBlogBySearch}
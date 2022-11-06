const res = require('express/lib/response')
const path=require('path')
const Blog =require('../models/blogModel')

const getEditor=(req,res)=>{
    try{
        //res.sendFile(path.join(__dirname,"../views/editor.html"))
        res.render('editor')
    }
    catch(error){
        console.log(error)
        res.status(500).render('error',{error:error})
        // res.status(500).json(
        //     {success:false,
        //         message:error
        //     }
        // )
    }
}

 const blogSubmitController=async (req,res)=>{
    console.log(req.body.data);
    try {
        const {emailId}=req.user
        console.log(emailId);
        console.log(req.body);
       let blog= new Blog({email:emailId, title:req.body.title ,content:req.body.content , comments:[]})
       let newBlog=await blog.save()
       res.json({
        success:true,
        newBlog
       }
        )
    
    } catch (error) {
        console.log(`Error: ${error}`)
        
    }
   

}

const blogCommentsSubmitController=async (req,res)=>{
    try {
        console.log(req.body);
        const blogId=req.body.blogId
        console.log(blogId);
        let blog=await Blog.findById(blogId)
        console.log(blog);
        blog.comments.push({comment:req.body.comment,user:req.user.emailId})
        let newBlog=await blog.save()
        res.json({
            success:true,
            newBlog})
    }
    catch(error){
        console.log(`Error : ${error}`)
    }
}

const blogUploadPhoto=(req,res,next)=>{
const file = req.file;
console.log(file.filename);
    console.log(file);
    if (!file) {
      const error = new Error('No File')
      error.httpStatusCode = 400
      return next(error)
    }
    
      res.send({filename:"../blogimages/"+file.filename});


}
const getBlogs=async (req,res)=>{
    try{
        const {emailId}=req.user
        let blogs=await Blog.find({emailId:emailId}).lean()
        console.log(blogs);
        res.render('blogs',{blogs:blogs})

    }
    catch(error){
        console.log(error)
        res.status(500).render('error',{error:error})
        // res.status(500).json(
        //     {success:false,
        //         message:error
        //     }
        // )
    }
}
const getBlogById=async (req,res)=>{

    try {
        console.log(req.params.id);
        let blog=await Blog.findById(req.params.id).lean()

        //res.send(`${blog.content}`)
        res.render('blog',{
            blog:blog
        })
       
        
    } catch (error) {
        console.log(error)
        res.status(500).render('error',{error:error})
    }


    // res.send(`
    // Hello World&nbsp;<br>How are you?<br><br><img src="../blogimages/1665244999247testimg.png"> <img src="../blogimages/1665244999268testimg.png">
    // `)
}
module.exports={blogSubmitController,blogUploadPhoto,getBlogById,getEditor,getBlogs,blogCommentsSubmitController}
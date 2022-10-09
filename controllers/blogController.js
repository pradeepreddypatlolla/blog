const path=require('path')
const Blog =require('../models/blogModel')
 const blogSubmitController=async (req,res)=>{
    console.log(req.body.data);
    try {
        
       let blog= new Blog({email:"pradeepreddyp1997@gmail.com",content:req.body.data})
       let newBlog=await blog.save()
       res.json(newBlog)
    
    } catch (error) {
        console.log(`Error: ${error}`)
        
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

const getBlogById=async (req,res)=>{

    try {
        console.log(req.params.id);
        let blog=await Blog.findById(req.params.id)

        res.send(`${blog.content}`)
       
        
    } catch (error) {
        console.log(`Error: ${error}`)
    }


    // res.send(`
    // Hello World&nbsp;<br>How are you?<br><br><img src="../blogimages/1665244999247testimg.png"> <img src="../blogimages/1665244999268testimg.png">
    // `)
}
module.exports={blogSubmitController,blogUploadPhoto,getBlogById}
const request=require('request')
const path=require('path')
const Blog =require('../models/blogModel')
const FormData=require('form-data')
const {cloudinary}=require('../config/cloudinary')
const getEditor=(req,res)=>{
    try{
       
        res.render('editor')
    }
    catch(error){
        console.log(error)
        res.status(500).render('error',{error:error})
       
    }
}

const getBlogEditor=async(req,res)=>{
    try {
        console.log(req.params.id);
        let blog=await Blog.findById(req.params.id).lean()

        //res.send(`${blog.content}`)
        res.render('blogeditor',{
            blog:blog
        })
       
        
    } catch (error) {
        console.log(error)
        res.status(500).render('error',{error:error})
    }
}

 const blogSubmitController=async (req,res)=>{
    console.log(req.body.data);
    try {
        const {emailId}=req.user
        console.log(emailId);
        console.log(req.body);
       let blog= new Blog({email:emailId, title:req.body.title ,content:req.body.content , comments:[],imgUrls:req.body.imgUrls})
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

const blogUpdateController=async(req,res,next)=>{
    console.log(req.body.data);
    try {
        const {emailId}=req.user
        console.log(emailId);
        console.log(req.body);
        let blogId=req.body.blogId
       let blog= await Blog.findByIdAndUpdate({_id:blogId},
        {
            title:req.body.title,content:req.body.content,imgUrls:req.body.imgUrls
       },
       )
       console.log(blog);
      // blog.update({title:req.body.title,content:req.body.content,imgUrls:req.body.imgUrls})
       
       res.json({
        success:true,
        blog
       }
        )
    
    } catch (error) {
        console.log(`Error: ${error}`)
        
    }

}

const blogDeleteController=async(req,res,next)=>{
   
    try {
       
        let blogId=req.body.blogId
        let blog=await Blog.findById(blogId)
        let imgUrls=blog.imgUrls
        //console.log(imgUrls);
        for(let i=0;i<imgUrls.length && imgUrls[i]!==null;i++){
            let splitURL=imgUrls[i].split('/')
            //console.log(splitURL[splitURL.length-1].split('.')[0]);
            let assetName=splitURL[splitURL.length-1].split('.')[0]
            cloudinary.uploader.destroy(assetName)
        }
       
        await Blog.findByIdAndDelete({_id:blogId})

       //console.log(blog);
      
       res.json({
        success:true,
        message:"Blog deleted successfully"
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


    console.log(req.body.data);
    console.log('backend ')
    cloudinary.uploader.upload(req.body.data,{
        upload_preset:'aqaepvlw'
    }).then((result) => {
        res.status(200).send({
          message: "success",
          url:result.url,
        });
      }).catch((error) => {
        console.log(error);
        res.status(500).send({
          message: "failure",
          error,
        });
      });


//         console.log(req.file)
       
//         let fd={}
//         fd.file=req.file
//         fd.upload_preset='aqaepvlw'
    

//     let options = {
//         method: 'POST',
//         uri: process.env.CLOUDINARY_URL,
//         formData: fd, // formData here is an object
//         headers: {
//             'Access-Control-Allow-Origin': '*',
//             'enctype': 'multipart/form-data',
//             'Content-Type': 'application/json',
//             'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT'
//         },
//         json: true
//     };
  
// request(options, function(error, response, body){
//     if(error) {
//         console.log(error);
//     } else {
//         console.log(response.statusCode, body);
//     }
//  });
    
    //  res.send({filename:"../blogimages/"+file.filename});


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

 
module.exports={blogSubmitController,blogUpdateController,blogDeleteController,blogUploadPhoto,getBlogById,getEditor,getBlogEditor,getBlogs,blogCommentsSubmitController}
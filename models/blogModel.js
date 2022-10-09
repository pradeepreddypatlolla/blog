const mongoose=require('mongoose')

const blogSchema=mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    
    content:{
        type:String,
        required:true
    },
},
{
    timestamps:true
}
)

const Blog=mongoose.model("Blog",blogSchema)
module.exports=Blog
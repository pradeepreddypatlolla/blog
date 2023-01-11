const express=require('express')
const app=express()
const dotenv=require('dotenv')
const path=require('path')
const dbconnect = require('../config/db')
const blogRouter=require('../routes/blogRoute')
const userRouter=require('../routes/userRoute')
const bodyParser = require('body-parser');
const cookieParser=require('cookie-parser')

dotenv.config()
dbconnect()


const exphbs  = require('express-handlebars');

//app.engine('handlebars', exphbs.engine({  defaultLayout: "main"}) );
app.engine('handlebars', exphbs.engine({  defaultLayout: "main",helpers: require('../config/handlebars-helpers')}) );

app.set('view engine', 'handlebars');
app.set("views", path.join(__dirname, "views"));
//console.log(__dirname);
app.use(express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({
    limit:'50mb',
    extended: true
}));
app.use(bodyParser.json({limit:'50mb'}));
app.use(cookieParser())



//s

app.get("/",(req,res)=>{
   
    // res.sendFile( path.join(__dirname,"views/index.html"))

    res.render('home')
})



app.use('/blog',blogRouter)
app.use('/user',userRouter)
// app.get('/user/login',(req,res,next)=>{
//     res.sendFile( path.join(__dirname,"views/login.html"))
// })

app.listen(process.env.PORT,()=>{
    console.log("Server is running at "+process.env.PORT)
})
const express=require('express')
const app=express()
const dotenv=require('dotenv')
const dbconnect = require('./config/db')
const blogRouter=require('./routes/blogRoute')

app.use(express.static(__dirname + '/'));
var bodyParser = require('body-parser');

dotenv.config()
dbconnect()
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.get("/",(req,res)=>{
   
    res.sendFile("index.html")
})


app.use('/blog',blogRouter)

app.listen(process.env.PORT,()=>{
    console.log("Server is running at "+process.env.PORT)
})
const express=require('express')
const router=express.Router()
const {registerController, getLoginController, getSignUpController,logoutController, userProfileController}=require('../controllers/userController')
const {loginController} =require('../controllers/userController')
const isAuthorized = require("../middleware/auth");
router.get('/login',getLoginController)
router.get('/signup',getSignUpController)
router.post("/register",registerController)
router.post("/login",loginController)
router.get('/profile',isAuthorized,userProfileController)
router.get('/logout',logoutController)
module.exports=router
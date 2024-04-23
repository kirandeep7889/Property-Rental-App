const express=require("express");
const registerUser = require("../controllers/userControllers/registerUser");
const authenticateUser = require("../controllers/userControllers/autthenticateUser");
const auth = require("../middlewares/auth");
const editProfile = require("../controllers/ProfileControllers/editUserProfile");
const userRoutes=express.Router();


userRoutes.post("/register",registerUser);
userRoutes.post("/authenticate",authenticateUser);
userRoutes.put("/editProfile",auth ,editProfile);



module.exports=userRoutes;



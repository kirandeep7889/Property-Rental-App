const express=require("express");
const filterProperties = require("../controllers/propertiesControllers/filterProperties");
const propertyRouter=express.Router();

propertyRouter.get("/filter",filterProperties);

module.exports=propertyRouter;
const express=require("express");
const filterProperties = require("../controllers/propertiesControllers/filterProperties");
const getProperty = require("../controllers/propertiesControllers/getProperty");
const propertyRouter=express.Router();

propertyRouter.get("/filter",filterProperties);
propertyRouter.get("/:id",getProperty);



module.exports=propertyRouter;
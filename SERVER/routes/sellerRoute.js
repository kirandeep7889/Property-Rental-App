const express=require("express");
const addProperty = require("../controllers/sellerControllers/addProperty");
const auth = require("../middlewares/auth");
const checkIsSeller = require("../middlewares/isSeller");
const editProperty = require("../controllers/sellerControllers/editProperty");
const deleteProperty = require("../controllers/sellerControllers/deleteProperty");
const getAllProperties = require("../controllers/sellerControllers/getAllProperties");
const getSellerProperties=require("../controllers/sellerControllers/getSellerProperties")
const sellerRoutes=express.Router();


sellerRoutes.post("/addProperty",auth ,checkIsSeller, addProperty);
sellerRoutes.patch("/editProperty/:id",auth ,checkIsSeller, editProperty);
sellerRoutes.delete("/deleteProperty/:id",auth ,checkIsSeller, deleteProperty);
sellerRoutes.get("/allProperties",getAllProperties);
sellerRoutes.get("/sellerProperties",auth,checkIsSeller,getSellerProperties)


module.exports=sellerRoutes;
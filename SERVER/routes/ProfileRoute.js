const express = require("express");
const ProfileRoute = express.Router();
const auth = require("../middlewares/auth");
const editUserProfile = require("../controllers/ProfileControllers/editUserProfile");
const getUserDetails = require("../controllers/ProfileControllers/getUserDetails");
const updatePassword = require("../controllers/ProfileControllers/updatePassword");




// ROUTE FOR UPDATING USER PROFILE
ProfileRoute.put("/updateProfile", auth, editUserProfile);


// ROUTE FOR GETTING ALL USER DETAILS
ProfileRoute.get("/getUserDetails", auth, getUserDetails);

// ROUTE FOR UPDATING PASSWORD
ProfileRoute.put("/updatePassword", auth, updatePassword);

module.exports = ProfileRoute;
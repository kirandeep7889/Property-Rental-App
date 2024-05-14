const express=require("express");
const auth = require("../middlewares/auth");
const checkIsBuyer = require("../middlewares/isBuyer");
const getBuyerBookings = require("../controllers/BookingControllers/BuyerBookingControllers/getBuyerBooking");
const checkIsSeller = require("../middlewares/isSeller");
const getSellerBookings = require("../controllers/BookingControllers/SellerBookingControllers/getSellerBookings");
const approveBooking = require("../controllers/BookingControllers/SellerBookingControllers/approveBooking");
const deleteBooking = require("../controllers/BookingControllers/SellerBookingControllers/deleteBooking");
const deleteBuyerBooking = require("../controllers/BookingControllers/BuyerBookingControllers/deleteBuyerBooking");
const checkAvailability = require("../controllers/BookingControllers/BuyerBookingControllers/checkAvailability");
const confirmBooking = require("../controllers/BookingControllers/BuyerBookingControllers/confirmBooking");
const bookingRouter=express.Router();


//BUYER BOOKING ROUTES

//1.Route for  checking availability for booking  
bookingRouter.post("/check-availability", auth ,checkIsBuyer, checkAvailability);
//2.Route for confirming booking  
bookingRouter.post("/confirm-booking", auth ,checkIsBuyer, confirmBooking);
//2.Route for getting all buyer bookings
bookingRouter.get("/buyer/:userId",auth,checkIsBuyer,getBuyerBookings);
//3.Route for deleting a specific booking
bookingRouter.delete("/buyer/:bookingId",auth,checkIsBuyer,deleteBuyerBooking);


//SELLER BOOKING ROUTES

//1.route for getting all bookings for specific property of a seller
bookingRouter.get("/seller/:propertyId",auth,checkIsSeller,getSellerBookings);
//2.route for approving the booking of buyer
bookingRouter.patch("/seller/approve/:bookingId",auth,checkIsSeller,approveBooking);
//3route for deleting the booking of buyer
bookingRouter.patch("/seller/delete/:bookingId",auth,checkIsSeller,deleteBooking)


module.exports=bookingRouter;
const Booking = require("../../../models/Booking");
const Property = require("../../../models/Property");
const User = require("../../../models/User");

  async function checkAvailability(req, res)  {
    try {
            const { username } = req.user; 
        
            const user = await User.findOne({ username });
            if (!user) {
              return res.status(404).json({ error: 'User not found' });
            }
      const { propertyId,  startDate, endDate } = req.body;

      

      const existingBooking = await Booking.findOne({
        propertyId,
        startDate: { $lte: endDate }, 
        endDate: { $gte: startDate }, 
      });
  
      console.log(existingBooking)
      if (existingBooking) {
        console.log("Already Booked")
        return res.status(400).json({
          success:false,
          message: 'Property is already booked for the specified dates' });
      }
      else{
      return res.status(200).json({
         success:true,
         message: "Available for booking"
      })
    }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }


  module.exports=checkAvailability
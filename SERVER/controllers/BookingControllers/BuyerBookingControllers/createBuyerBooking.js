const Booking = require("../../../models/Booking");
const Property = require("../../../models/Property");
const User = require("../../../models/User");

  async function createBuyerBooking (req, res)  {
    try {
            const { username } = req.user; 
        
            const user = await User.findOne({ username });
            if (!user) {
              return res.status(404).json({ error: 'User not found' });
            }
      const { propertyId,  startDate, endDate } = req.body;

      

      const existingBooking = await Booking.findOne({
        propertyId,
        startDate: { $lte: endDate }, // Check if the existing booking's end date is after the requested start date
        endDate: { $gte: startDate }, // Check if the existing booking's start date is before the requested end date
      });
  
      console.log(existingBooking)
      if (existingBooking) {
        console.log("Already Booked")
        return res.status(400).json({
          success:false,
          message: 'Property is already booked for the specified dates' });
      }
  
      const property = await Property.findById(propertyId);
      if (!property) {
        return res.status(404).json({
           error: 'Property not found' });
      }
  
      
      const newBooking =  await Booking.create({
        propertyId,
        userId:user._id,
        startDate,
        endDate
      })
      console.log(newBooking)
  
      res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };


  module.exports=createBuyerBooking;
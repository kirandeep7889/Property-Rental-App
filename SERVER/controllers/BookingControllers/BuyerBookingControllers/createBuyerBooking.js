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
      
      const property = await Property.findById(propertyId);
      if (!property) {
        return res.status(404).json({ error: 'Property not found' });
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
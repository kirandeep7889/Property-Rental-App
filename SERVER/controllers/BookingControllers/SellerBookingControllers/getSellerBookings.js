const Booking = require("../../../models/Booking");
const Property = require("../../../models/Property");
const User = require("../../../models/User");

async  function getSellerBookings(req, res)  {
    try {
      const { propertyId } = req.params;
      const { username } = req.user; 

      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Check if the user is the seller of the property
      const property = await Property.findOne({ _id: propertyId, seller_id: user._id });
      if (!property) {
        return res.status(403).json({ error: 'Unauthorized. You are not the seller of this property' });
      }
  
      const bookings = await Booking.find({ propertyId });
     
      if(!bookings) {
        return res.status(400).json({
            message: "Currently no bookings for your property"
        })
      }

      res.status(200).json({
        bookings});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  module.exports=getSellerBookings;
const Booking = require("../../../models/Booking");
const Property = require("../../../models/Property");
const User = require("../../../models/User");

async function deleteBooking (req, res) {
    try {
      const { bookingId } = req.params;
      const { propertyId } = req.body;

      const { username } = req.user; 

      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      //First  Check if the  user is the seller of the property or not
      const property = await Property.findOne({ _id: propertyId, seller_id: user._id });
      if (!property) {
        return res.status(403).json({ error: 'Unauthorized. You are not the seller of this property' });
      }

      //delete the booking
      const booking = await Booking.findByIdAndDelete(bookingId);
      if (!booking) {
        return res.status(404).json({ error: 'Booking not found' });
      }
      res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

module.exports=deleteBooking;

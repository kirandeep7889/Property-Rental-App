const Booking = require("../../../models/Booking");

async function getBuyerBookings (req, res) {
    try {
      const { userId } = req.params;
      const bookings = await Booking.find({ userId});
      res.status(200).json(bookings);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }


  module.exports=getBuyerBookings
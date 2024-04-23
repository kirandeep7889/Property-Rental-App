const Booking = require("../../../models/Booking");

async function deleteBuyerBooking (req, res)  {
    try {
      const { bookingId } = req.params;
      const booking = await Booking.findByIdAndDelete(bookingId);
      if (!booking) {
        return res.status(404).json({ error: 'Booking not found' });
      }
      res.status(200).json({ message: 'Booking canceled successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }


  module.exports=deleteBuyerBooking;
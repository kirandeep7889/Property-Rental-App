const Property = require("../../models/Property");

 const deleteProperty= async (req, res) => {
    try {
      const { id } = req.params;
  
      const property = await Property.findByIdAndDelete(id);
      if (!property) {
        return res.status(404).json({ error: 'Property not found' });
      }
  
      res.status(200).json({ message: 'Property deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  module.exports=deleteProperty;
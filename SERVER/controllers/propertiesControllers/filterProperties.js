const Property = require("../../models/Property");

async function filterProperties (req, res) {
    try {
      console.log("hello")
      const { searchTerm, minPrice, maxPrice, minBeds, maxBeds } = req.query;
      console.log(searchTerm)
      let filter = {};
  
      if (searchTerm) {
        filter.searchTerm = searchTerm;
      }
      if (minPrice || maxPrice) {
        filter.price = {};
        if (minPrice) {
          filter.price.$gte = minPrice;
        }
        if (maxPrice) {
          filter.price.$lte = maxPrice;
        }
      }
      if (minBeds || maxBeds) {
        filter.numBeds = {};
        if (minBeds) {
          filter.numBeds.$gte = minBeds;
        }
        if (maxBeds) {
          filter.numBeds.$lte = maxBeds;
        }
      }
  
      const properties = await Property.find(filter);
      console.log(properties)
      res.status(200).json(properties);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  module.exports=filterProperties;
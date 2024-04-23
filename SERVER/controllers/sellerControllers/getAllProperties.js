const Property = require("../../models/Property");

const getAllProperties=async (req, res) => {
    try {
      const properties = await Property.find();
      res.status(200).json(properties);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  module.exports=getAllProperties;
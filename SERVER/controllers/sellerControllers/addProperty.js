const Property = require("../../models/Property");
const User = require("../../models/User");

const addProperty = async (req, res) => {
  try {
    const { username } = req.user; 

    const user = await User.findOne({ username });
    console.log(user)
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { property_name, description, price, location,furnished, bedrooms, parking, imageUrls, bathrooms } = req.body;

    const newProperty = await Property.create({
      seller_id: user._id,
      property_name,
      description,
      price,
      location,
      bedrooms,
      parking,
      furnished,
      imageUrls,
      bathrooms
    });

    res.status(201).json({ message: 'Property added successfully', property: newProperty });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = addProperty;

const Property = require("../../models/Property");
const User = require("../../models/User");

const getSellerProperties=async (req, res) => {
    try {
        const { username } = req.user; 

        const user = await User.findOne({ username });
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
      const properties = await Property.find({ seller_id: user._id });

      if(!properties) {
        return res.status(404).json({error:'No property for this seller'})
      }

      res.status(200).json(properties);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  
  module.exports=getSellerProperties;
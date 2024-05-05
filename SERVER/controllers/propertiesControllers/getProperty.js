const Property = require("../../models/Property");


async function getProperty(req, res)  {
    try {
      const listing = await Property.findById(req.params.id);
      if (!listing) {
        return next(errorHandler(404, 'Listing not found!'));
      }
      res.status(200).json(listing);
    } catch (error) {
      console.log(error)
    }
  };

  module.exports=getProperty;
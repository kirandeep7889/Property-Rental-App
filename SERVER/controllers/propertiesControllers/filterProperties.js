const Property = require("../../models/Property");

const filterProperties = async (req, res, next) => {
  try {
    const { furnished, parking, searchTerm, location, minBeds, maxBeds, minPrice, maxPrice } = req.query;

    const filters = {};

    if (furnished !== undefined && furnished !== 'false') {
      filters.furnished = furnished === 'true';
    }

    if (parking !== undefined && parking !== 'false') {
      filters.parking = parking === 'true';
    }

    if (searchTerm) {
      const regexSearchTerm = searchTerm.split(' ').join('|');
      filters.property_name = { $regex: regexSearchTerm, $options: 'i' };
    }

    if (location) {
      const regexLocation = location.split(' ').join('|');
      filters.location = { $regex: regexLocation, $options: 'i' };
    }

    if (minBeds && maxBeds) {
      filters.bedrooms = { $gte: parseInt(minBeds), $lte: parseInt(maxBeds) };
    } else if (minBeds) {
      filters.bedrooms = { $gte: parseInt(minBeds) };
    } else if (maxBeds) {
      filters.bedrooms = { $lte: parseInt(maxBeds) };
    }

    if (minPrice && maxPrice) {
      filters.price = { $gte: parseInt(minPrice), $lte: parseInt(maxPrice) };
    } else if (minPrice) {
      filters.price = { $gte: parseInt(minPrice) };
    } else if (maxPrice) {
      filters.price = { $lte: parseInt(maxPrice) };
    }

    const listings = await Property.find(filters);

    console.log(listings)
    
    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};

module.exports = filterProperties;

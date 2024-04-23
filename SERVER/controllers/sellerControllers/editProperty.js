const Property = require("../../models/Property");

const editProperty = async (req, res) => {
    try {
        const { id } = req.params;
        const { property_name, description, price, location } = req.body;

        const property = await Property.findById(id);
        if (!property) {
            return res.status(404).json({ error: 'Property not found' });
        }

        if (property_name) {
            property.property_name = property_name;
        }
        if (description) {
            property.description = description;
        }
        if (price) {
            property.price = price;
        }
        if (location) {
            property.location = location;
        }

        const validationErrors = property.validateSync();
        if (validationErrors) {
            return res.status(400).json({ error: validationErrors.message });
        }

        await property.save();

        res.status(200).json({ message: 'Property updated successfully', property });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = editProperty;

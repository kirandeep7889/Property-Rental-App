const mongoose=require("mongoose")

const propertySchema = new mongoose.Schema({
    seller_id: { type: mongoose.Schema.Types.ObjectId,
         ref: 'User',
          required: true
         },
     property_name: { type: String,
         required: true
         },
     description: { type: String,
         required: true
         },
         bedrooms: {
          type: Number,
          required: true,
        },
     price: { type: Number,
         required: true
         },
     location: { type: String, 
        required: true
     },
     parking: {
          type: Boolean,
          required: true,
        },
     imageUrls: {
          type: Array,
          required: true,
        },   
     bathrooms: {
          type: Number,
          required: true,
        },
  });
  
  const Property = mongoose.model('Property', propertySchema);
  
  module.exports = Property;
  
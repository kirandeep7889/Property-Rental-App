const mongoose = require('mongoose');
require("dotenv").config();


exports.dbConnect = () => {
    mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("DB CONNECTED SUCESSFULLY"))
    .catch((err) => {
        console.log("DB CONNECTION FAILED");
        console.error(err);
        process.exit(1);
    })
};
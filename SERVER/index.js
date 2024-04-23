const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./config/db.js");
const sellerRoutes = require("./routes/sellerRoute");
const userRoutes = require("./routes/userRoute");
const bookingRouter = require("./routes/bookingRoute.js");
const propertyRouter = require("./routes/propertyRoute.js");
const PORT=process.env.PORT || 4000;
const cookieParser = require("cookie-parser");
const ProfileRoute = require("./routes/ProfileRoute.js");

require("dotenv").config();


//middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());


//db connection
db.dbConnect();

//routes middleware
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/seller",sellerRoutes);
app.use("/api/v1/bookings",bookingRouter);
app.use("/api/v1/properties",propertyRouter);
app.use("/api/v1/profile",ProfileRoute)


app.listen(PORT, () => {
    console.log("SERVER STARTED AT PORT :" + `${PORT}`);
});



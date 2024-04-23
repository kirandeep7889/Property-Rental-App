const User = require("../../models/User");


const getUserDetails = async(req, res) => {
    try{
        // FIND ID
        const id = req.user.id;

        // VALIDATION AND GET USER DETAILS
        const userDetails = await User.findById(id).populate("additionalDetails").exec();

        // RETURN RESPONSE
        return res.status(200).json({
            success : true,
            message : "USER FETCHED SUCCESSFULLY",
            data : userDetails
        })

    }catch(err){
        console.log(err);
        return res.status(500).json({
            success : false,
            message : "USER DATA CAN'T BE FETCHED"
        })
    }

}

module.exports=getUserDetails
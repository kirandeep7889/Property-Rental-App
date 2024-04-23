const bcrypt=require("bcrypt")
const User = require("../../models/User");

 const updatePassword = async(req, res) => {
    try{
        // VALIDATION

        const { oldPassword, newPassword } = req.body;

        if(!oldPassword || !newPassword){
            return res.status(404).json({
                success : false,
                message : "ALL FIELDS ARE REQUIRED"
            })
        }

        
        // CHECK OLD PASSWORD AND NEW PASSWORD SAME OR NOT
        if(oldPassword === newPassword){
            return res.status(403).json({
                success : false,
                message : "BOTH PASSWORD FIELDS CONTAIN SAME VALUE"
            })
        }

        // FIND USER
        const userId = req.user.id

        const user = await User.findById(userId);
        if(!user){
            return res.status(400).json({
                success: false,
                message: "USER NOT FOUND"
            })
        }

        // OLD PASSWORD CHECKING CORRECT OR NOT
        const isPassSame = await bcrypt.compare(oldPassword, user.password)
        if(isPassSame){

  
            if(oldPassword === newPassword){
                return res.status(403).json({
                    success : false,
                    message : "OLD AND NEW PASSWORD IS SAME"
                })
            }

            // CREATING NEW PASSWORD HASH
            const hashedPassword = await bcrypt.hash(newPassword, 10);

            // PASSWORD UPDATE IN DB
            await User.findByIdAndUpdate(userId,
                {password : hashedPassword},
                {new : true}
            );

            // RETURN RESPONSE
            return res.status(200).json({
                success : true,
                message : "Password Changed Sucessfully"
            })
        }
    }catch(err){
        console.log(err)
        return res.status(500).json({
            success : false,
            message : "Password changing Failed",
            err : err.message
        })
    }
}

module.exports=updatePassword;
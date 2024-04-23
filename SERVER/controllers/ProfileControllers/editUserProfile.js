const Profile = require("../../models/Profile");
const User = require("../../models/User");

 const  editUserProfile=async(req,res)=> {
  try{
    // FETCH DATA
    const {firstName, lastName="",dateOfBirth="", contactNumber, gender=""} = req.body;

    // GET USER ID
    const id = req.user.id;

    // FIND PROFILE
    const userDetails = await User.findById(id);
    const profileId = userDetails.additionalDetails;
    const profileDetails = await Profile.findById(profileId);

    // UPDATE PROFILE
    if(!firstName){
        return res.status(404).json({
            success: false,
            message: "FIRST NAME IS COMPULSORY"
        })
    }
    userDetails.firstName = firstName
    if(lastName) userDetails.lastName = lastName;
    if(dateOfBirth) profileDetails.dateOfBirth = dateOfBirth;
    if(gender) profileDetails.gender = gender;
    if(contactNumber) profileDetails.contactNumber = contactNumber;

    await profileDetails.save();
    await userDetails.save();
    userDetails.additionalDetails = profileDetails

    // RETURN RES
    return res.status(200).json({
        success : true,
        message : "PROFILE UPDATED SUCCESSFULLY",
        data: userDetails
    })
}catch(err){
    console.log(err);
    return res.status(500).json({
        success : false,
        message : "PROFILE UPDATION FAILED"
    })
}
  }


module.exports= editUserProfile;
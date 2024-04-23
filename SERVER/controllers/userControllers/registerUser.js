const bcrypt=require("bcrypt");
const User = require("../../models/User");
const Profile = require("../../models/Profile");


const registerUser= async(req, res) => {
    try {
      console.log(req.body)
      const {firstName,lastName, password, email, accountType } = req.body;
      console.log(firstName);
      console.log(lastName);
      console.log(password)
  
      const existingUser = await User.findOne({ $or: [ { email }] });
      if (existingUser) {
        return res.status(409).json({ error: 'Username or email already exists' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);

      const profileDetails = await Profile.create({
        gender : null,
        dateOfBirth : null,
        contactNumber : null,
        about : null,
    });
  
      const newUser = new User({ 
        firstName,
        lastName, 
        email,
        password: hashedPassword,
        role:accountType, 
        additionalDetails : profileDetails._id,
          image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,

       });
      await newUser.save();
  
      return res.status(200).json({
        success :  true,
        message :  "USER IS REGISTERED SUCCESFULLY",
        user :newUser
    })

    } catch (err) {
      return res.status(500).json({
        success : false,
        message : "USER CANT BE REGISTERED. PLEASE TRY AGAIN",
        err : err.message
    })
    }
}  

module.exports=registerUser;
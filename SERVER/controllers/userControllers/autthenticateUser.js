const User = require("../../models/User");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken")

const authenticateUser=async (req, res) => {
    try {
      const {email, password } = req.body;
      console.log("hi ")
      console.log(email)
  
      const user = await User.findOne({ email:email });
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      console.log(user)
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      const payload = {
        email : user.email,
        id : user._id,
        role : user.role,
       }
  
      const token = jwt.sign( payload,  process.env.jwt_secret, { expiresIn: '24h' });
      console.log(token)

      const options = {
        expires : new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly : true
      }   
      res.cookie("token", token, options).status(200).json({
        success : true,
        token,
        user,
        message : "LOGGED IN SUCCESSFULLY"
    })
    } catch (err) {
      return res.status(500).json({
        success : false,
        message : "LOGIN FAILURE, PLEASE TRY AGAIN"
    })
    }
  }

 
 module.exports=authenticateUser; 
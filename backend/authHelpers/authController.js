const userModel  = require( "../models/userModel")
const { comparePassword, hashPassword } = require("./authHelper")
const JWT = require( "jsonwebtoken")

const registerController = async (req,res) =>{

    try{
        const {password, email, name} = req.body

        if(!email){
          return res.send({success: false, error: "email is required", alreadyExists: false})
        }
        
        if(!password){
            return res.send({success: false, error: "password is required", alreadyExists: false})
        }
        if(!name){
          return res.send({success: false, error: "name is required", alreadyExists: false})
        }

        //check user
        const existingUser = await userModel.findOne({email})
        //check existing user
        if(existingUser){
            return res.status(200).send({
                success: false,
                message: "Already registered please login",
                alreadyExists: true
            })
        }

        //register user
        const hashedPassword = await hashPassword(password)
        //save
        const user = await new userModel({password:hashedPassword,email, name}).save()

        res.status(201).send({
            success:true, message: "user registered successfully" , user
        })
        

    }catch(err){
        console.log(err)
        res.status(500).send({
            success: false,
            message: 'Error in Registration',
            alreadyExists: false,
            err

        })
    }
}

//POST LOGIN
const loginController = async (req, res) => {
    try {
      const {email, password } = req.body;
      
      if (!password || !email) {
        return res.status(404).send({
          success: false,
          message: "Invalid password or email",
        });
      }

      const user = await userModel.findOne({email});
      
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "user is not registerd",
        });
      }

      const match = await comparePassword(password, user.password);

      if (!match) {
        return res.status(200).send({
          success: false,
          message: "Invalid Password",
        });
      }

      //token
      const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      res.status(200).send({
        success: true,
        message: "login successfully",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,

        },
        token,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error in login",
        error,
      });
    }
  }; 
  
module.exports = {registerController, loginController}

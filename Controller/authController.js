import jwt from 'jsonwebtoken';
import User from "../model/UserModel.js";
import bcryptjs from 'bcryptjs';
import errorHandler from '../utils/error.js';

export const Signup = async (req,res,next) => {
    const {username , email , password} = req.body;
    const hashPassword = bcryptjs.hashSync(password,10);
    const newUser = new User({username,email,password : hashPassword});
    
    try{
        await newUser.save()
        res.status(200).json("User Created Successfully...!!!");
    }
    catch(err){
        next(err);
    }
    
}

export const SignIn = async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const validUser = await User.findOne({ email });
      if (!validUser) return next(errorHandler(404, 'User not found!'));
      const validPassword = bcryptjs.compareSync(password, validUser.password);
      if (!validPassword) return next(errorHandler(401, 'Wrong credentials!'));
      const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = validUser._doc;
      res
      .cookie('access_token', token, { httpOnly: true })
      .status(200)
      .json(rest);
    } catch (error) {
      next(error);
    }
  };

export const Google = async (req,res,next) => {
    
    try{
        const {email} = req.body;
        const validUser = await User.findOne({email});

        if(validUser){
            const token = jwt.sign({id : validUser._id},process.env.JWT_SECRET)
            const {password : pass, ...rest} = validUser._doc;

            res.cookie("access_token",token,{httpOnly:true})
                .status(201)
                .json(rest);
        }
        else{

            const generatePassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashPassword = bcryptjs.hashSync(generatePassword,10);
            const user = new User({username : req.body.name.split(" ").join("").toLowerCase() + 
                Math.random().toString(36).slice(-4),
                email : req.body.email,
                password : hashPassword,
                avatar : req.body.photo
            })
            await user.save();

            const token = jwt.sign({id : validUser._id},process.env.JWT_SECRET)
            const {password : pass, ...rest} = validUser._doc;

            res.cookie("access_token",token,{httpOnly:true})
                .status(201)
                .json(rest);
        }

        
    }
    catch(error){
        next(error);
    }
}

export const SignOut = async (req, res, next) => {
    try {
      res.clearCookie('access_token');
      res.status(200).json('User has been logged out!');
    } catch (error) {
      next(error);
    }
  };
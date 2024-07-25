import Listing from "../model/ListingModel.js";
import User from "../model/UserModel.js";
import errorHandler from "../utils/error.js";
import bcryptjs from 'bcryptjs';

export const test = (req, res) => {
  res.json({
    message: 'Api route is working!',
  });
};

export const updateUser = async (req, res, next) => {
  // if (req.user.id !== req.params.id)
  //   return next(errorHandler(401, 'You can only update your own account!'));
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  // if (req.user.id !== req.params.id)
  //   return next(errorHandler(401, 'You can only delete your own account!'));
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie('access_token');
    res.status(200).json('User has been deleted!');
  } catch (error) {
    next(error);
  }
};

export const getUserListing = async(req,res,next)=> {

  try{
      const listings = await Listing.find({userRef : req.params.id});
      res.status(200).json(listings);
  }
  catch(error){
      next(error);
  }
}

export const getUser = async(req,res,next)=>{
  try {
    const user = await User.findById(req.params.id);
    const {password : pass, ...rest} = user._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error)
  }
}
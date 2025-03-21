import User from '../models/User.js';
import bcrypt from 'bcrypt';
import { uploadPic  } from '../middleware/updateProfilePicmiddleware.js';
import { removeFile } from '../utilities/FileRemover.js';



const registerUser = async (req, res, next) => {
    try {
      const { name, email, password } = req.body;
  
      // check whether the user exists or not
      let user = await User.findOne({ email });
  
      if (user) {
        throw new Error("User have already registered");
      }
  
      // creating a new user
      user = await User.create({
        name,
        email,
        password,
      });
  
      return res.status(201).json({
        _id: user._id,
        avatar: user.avatar,
        name: user.name,
        email: user.email,
        verified: user.verified,
        isAdmin: user.admin,
        isDriver: user.driver,
        isManager: user.manager,
        isPaymentManager: user.paymentManager,
        token: await user.generateJWT (),    
      });
    } catch (error) {
      next(error);
    }
  };


const loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        // Check if user exists
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Compare the password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate token and send response
        const token = await user.generateJWT ();
        res.status(200).json({
            _id: user._id,
            avatar: user.avatar,
            name: user.name,
            email: user.email,
            verified: user.verified,
            isAdmin: user.isAdmin,
            isDriver: user.isDriver,
            isManager: user.isManager,
            isPaymentManager: user.isPaymentManager,
            token: token,
        });
    } catch (error) {
        next(error);
    }
};


const userProfile = async (req, res , next) => {

    try {
        
        let user = await User.findById(req.user._id);
        if(user){
            res.status(201).json({ 
                _id : user._id,
                avatar : user.avatar,   
                name : user.name,
                email : user.email,
                verified : user.verified,
                isAdmin : user.isAdmin,
                isDriver : user.isDriver,
                isManager : user.isManager,
                isPaymentManager : user.isPaymentManager,
                token : await user.generateJWT (),
    
             });
        }else{
            let err = new Error('User not found');
            err.statusCode = 404;
            next(err);
        }


    } catch (error) {
        next(error);
    }


}


const updateProfile  = async (req, res , next) => {

    try {

        let user = await User.findById(req.user._id);

        if(!user){
            throw new Error('User not found');

        }else{
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.password = req.body.password || user.password;
            if(req.body.password && req.body.password.length < 6){ 
                throw new Error('Password must be at least 6 characters long');
            }else if(req.body.password){
                user.password = req.body.password;
            }
        }
        
        const updatedUser = await user.save();

        res.status(200).json({
            _id : updatedUser._id,
            avatar : updatedUser.avatar,
            name : updatedUser.name,
            email : updatedUser.email,
            isAdmin : updatedUser.isAdmin,
            isDriver : updatedUser.isDriver,
            isManager : updatedUser.isManager,
            isPaymentManager : updatedUser.isPaymentManager,
            token : await updatedUser.generateJWT (),
        });

        
    } catch (error) {
        next(error);
    }

}

const updateProfileImage = async (req, res, next) => {
    try {
        const upload = uploadPic.single('ProfilePicture');

        upload(req, res, async (err) => {
            if (err) {
                let error = new Error('Something went wrong when uploading the image: ' + err.message);
                error.statusCode = 400;
                next(error);
            } else {
                if (req.file) {
                    // Update user with new profile picture
                    let filename;
                    let  updatedUser = await User.findByIdAndUpdate(req.user._id);
                    filename = updatedUser.avatar;
                    if(filename){
                    
                        removeFile(filename);
                    
                    }
                    updatedUser.avatar = req.file.filename;
                    await updatedUser.save();
                    res.status(200).json({
                        _id: updatedUser._id,
                        avatar: updatedUser.avatar,
                        name: updatedUser.name,
                        email: updatedUser.email,
                        isAdmin: updatedUser.isAdmin,
                        isDriver: updatedUser.isDriver,
                        isManager: updatedUser.isManager,
                        isPaymentManager: updatedUser.isPaymentManager,
                        token: await updatedUser.generateJWT (),
                    });
                } else {
                    // Remove existing profile picture
                    let updateUser = await User.findById(req.user._id);
                    let filename = updateUser.avatar;
                    updateUser.avatar = "";
                    await updateUser.save();
                    removeFile(filename);
                    
                    res.status(200).json({
                        _id: updateUser._id,
                        avatar: updateUser.avatar,
                        name: updateUser.name,
                        email: updateUser.email,
                        isAdmin: updateUser.isAdmin,
                        isDriver: updateUser.isDriver,
                        isManager: updateUser.isManager,
                        isPaymentManager: updateUser.isPaymentManager,
                        token: await updateUser.generateJWT (),
                    });
                }
            }
        });
    } catch (error) {
        next(error);
    }
};




export { registerUser , loginUser ,userProfile , updateProfile , updateProfileImage };

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
        admin: user.admin,
        driver: user.driver,
        manager: user.manager,
        address: user.address,
        mobilenumber: user.mobilenumber,
        paymentManager: user.paymentManager,
        token: await user.generateJWT (),    
        createdAt: user.createdAt,
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
            admin: user.admin,
            address: user.address,
            mobilenumber: user.mobilenumber,
            driver: user.driver,
            manager: user.manager,
            paymentManager: user.paymentManager,
            token: token,
            createdAt: user.createdAt,
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
                admin : user.admin,
                address : user.address,
                mobilenumber : user.mobilenumber,
                driver : user.driver,
                manager : user.manager,
                paymentManager : user.paymentManager,
                token : await user.generateJWT (),
                createdAt: user.createdAt,  
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



        let userId = req.user._id;

        if(!req.user.admin && userId !== userId){
            throw new Error('You are not authorized to update this profile');
        }

        if(typeof req.body.admin !== 'undefined' && req.user.admin){
            User.admin = req.body.admin;
        }

    try {

        let user = await User.findById(userId);

        if(!user){
            throw new Error('User not found');

        }else{
            user.name = req.body.name || user.name;
            if (req.body.mobilenumber) {
              const mobilePattern = /^\d{10}$/;
              if (!mobilePattern.test(req.body.mobilenumber)) {
                  throw new Error('Mobile number must be 10 digits');
              }
              console.log("Mobile number:", req.body.mobilenumber);
              user.mobilenumber = req.body.mobilenumber;
      
          }
            user.address = req.body.address || user.address;
            if(req.body.address && req.body.address.length < 6){ 
                throw new Error('Address must be at least 6 characters long');
            }else if(req.body.address){
                user.address = req.body.address;
            }
        }
        
        const updatedUser = await user.save();

        res.status(200).json({
            _id : updatedUser._id,
            avatar : updatedUser.avatar,
            name : updatedUser.name,
            email : updatedUser.email,
            admin : updatedUser.admin,
            address : updatedUser.address,
            mobilenumber : updatedUser.mobilenumber,
            driver : updatedUser.driver,
            manager : updatedUser.manager,
            paymentManager : updatedUser.paymentManager,
            token : await updatedUser.generateJWT (),
            createdAt: updatedUser.createdAt,
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
                        admin: updatedUser.admin,
                        address: updatedUser.address,
                        mobilenumber: updatedUser.mobilenumber,
                        driver: updatedUser.driver,
                        manager: updatedUser.manager,
                        paymentManager: updatedUser.paymentManager,
                        token: await updatedUser.generateJWT (),
                        createdAt: updatedUser.createdAt,
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
                        admin: updateUser.admin,
                        address: updateUser.address,
                        mobilenumber: updateUser.mobilenumber,
                        driver: updateUser.driver,
                        manager: updateUser.manager,
                        paymentManager: updateUser.paymentManager,
                        token: await updateUser.generateJWT (),
                        createdAt: updateUser.createdAt,
                    });
                }
            }
        });
    } catch (error) {
        next(error);
    }
};

const getAllUsers = async (req, res, next) => {
    try {


    // Only allow admins to access this route
    if (!req.user || !req.user.admin) {
      return res.status(403).json({ message: 'Access denied, not an admin' });
       }


      const filter = req.query.searchKeyword;
      let where = {};
      if (filter) {
        where.email = { $regex: filter, $options: "i" };
      }
      let query = User.find(where);
      const page = parseInt(req.query.page) || 1;
      const pageSize = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * pageSize;
      const total = await User.find(where).countDocuments();
      const pages = Math.ceil(total / pageSize);
  
      res.header({
        "x-filter": filter,
        "x-totalcount": JSON.stringify(total),
        "x-currentpage": JSON.stringify(page),
        "x-pagesize": JSON.stringify(pageSize),
        "x-totalpagecount": JSON.stringify(pages),
      });
  
      if (page > pages) {
        return res.json([]);
      }
  
      const result = await query
        .skip(skip)
        .limit(pageSize)
        .sort({ updatedAt: "desc" });
  
      return res.json(result);
    } catch (error) {
      next(error);
    }
  };
  
  const deleteUser = async (req, res, next) => {
    try {
      const userId = req.params.userId;
      console.log("Received request to delete user with ID:", req.params.userId);  
      let user = await User.findById(userId);
  
  
      if (!user) {
        throw new Error("User no found");
      }
  
    
  
      await User.findByIdAndDelete(userId); // This deletes the user from the DB

      console.log("User deleted from DB");
      if (user.avatar) {
        fileRemover(user.avatar);  
    }
  
      res.status(204).json({ message: "User is deleted successfully" });
    } catch (error) {
        console.log("Error deleting user:", error);
        next(error);
    }
  };

   const updateUserRoleToAdmin = async (req, res, next) => {
    try {
      const userId = req.params.userId;
      console.log("Attempting to update user role to admin for user ID:", userId);
  
      // Find the user by ID and update their role to "admin"
      const updatedUser = await User.findByIdAndUpdate(
        userId, 
        { role: 'admin' , admin: true }, 
        { new: true }  // Ensure the updated document is returned
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      console.log("User role updated to admin");
  
      res.status(200).json({ message: "User role updated to admin successfully", updatedUser });
    } catch (error) {
      console.error("Error occurred:", error);
      next(error);
    }
  };



export { registerUser , loginUser ,userProfile , updateProfile , updateProfileImage , getAllUsers , deleteUser , updateUserRoleToAdmin };

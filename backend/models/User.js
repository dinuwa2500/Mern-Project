import { Schema , model } from 'mongoose'
import bcrypt from 'bcrypt';
import  jwt  from 'jsonwebtoken';

const UserSchema = new Schema ({

avatar : {  type : String , default : ""  },
name : { type : String ,required  : true} ,
email : { type : String ,required  : true , unique : true} ,
password : { type : String ,required  : true} ,
verified : { type : Boolean , default : false},
//verificationCode : {type : String , required : true },
admin : { type : Boolean , default : false},
driver : { type : Boolean , default : false},
manager : { type : Boolean , default : false},
paymentManager : { type : Boolean , default : false},
},
{timestamps : true}
)

UserSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 10);
      
    }
    next();
  });
  
  UserSchema.methods.generateJWT  = async function() {
    try {
      console.log("Generating token for user with ID:", this._id);  // Debug log
      const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
      console.log("Token generated:", token);  // Debug log
      return token;
  } catch (error) {
      console.error("Error generating token:", error);
      throw new Error("Token generation failed");
  }
};
  
  UserSchema.methods.comparePassword = async function (enteredPassword) {
    const match = await bcrypt.compare(enteredPassword, this.password);
    console.log("Password match status:", match);  // Debug log
    return match;
  };

const User = model('User', UserSchema);

export default User;

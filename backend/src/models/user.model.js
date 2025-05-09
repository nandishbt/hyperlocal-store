import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        lowercase:true,
        unique:true,
        required:true
    },
    fullname:{
        type:String,
        lowercase:true,
        required:true

    },
    email:{
        type:String,
        lowercase:true,
        required:true,
        unique:true
    },
    phone:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true

    }

},{timestamps:true})

userSchema.pre('save', async function (next) {      
    //es5 function is used to reference this keyword
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
  });
  
  userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password); 
  };
  
  userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
      {
        _id: this._id,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
  };

const User = mongoose.models.users || mongoose.model('User',userSchema)

export default User
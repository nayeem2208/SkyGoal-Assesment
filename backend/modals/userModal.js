import mongoose from "mongoose";
import bcrypt from "bcrypt";

let userSchema = mongoose.Schema({
  name:{
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
  },
  Address:{
    type:String
  },
  profilePic: {
    type: String,
  },
  password: {
    type: String,
  },
});

userSchema.methods.matchpassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

const usermodel = mongoose.model("User", userSchema);

export default usermodel;
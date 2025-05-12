import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    phoneNumber: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    avatar: {
      type: String,
      default: "https://www.gravatar.com/avatar/?d=mp&f=y",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    googleId: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;

// import mongoose from 'mongoose';
// import bcrypt from 'bcryptjs';

// const userSchema = new mongoose.Schema({
//   name: String,
//   email: { type: String, unique: true },
//   password: { type: String},
//   avatar: String,
//   role: { type: String, enum: ['user', 'admin'], default: 'user' }
// });

// userSchema.pre('save', async function () {
//   if (this.isModified('password')) {
//     this.password = await bcrypt.hash(this.password, 10);
//   }
// });

// userSchema.methods.comparePassword = async function (password) {
//   // console.log("from model",this.password)
//   const isMatch = await bcrypt.compare(password, this.password);
//   console.log("from model",isMatch)
//   return isMatch;
// };

// export default mongoose.model('User', userSchema);

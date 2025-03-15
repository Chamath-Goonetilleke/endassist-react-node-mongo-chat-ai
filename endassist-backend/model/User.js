import mongoose, { Schema } from 'mongoose';
import jsonwebtoken from "jsonwebtoken";

const userSchema = new Schema({
    name: {type:String},
    email: {type:String},
    dob:{type:String},
    password: {type:String}
})

userSchema.methods.generateAuthToken = function () {
  const token = jsonwebtoken.sign(
    {
      _id: this.id,
      email: this.email,
      name: this.name,
      dob:this.dob,
    },
    process.env.JWT_PRIVATE_KEY
  );
  return token;
};

export default mongoose.model("users", userSchema);
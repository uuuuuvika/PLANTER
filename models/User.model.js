const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    picture:{
      type:String,
    },
    username: {
      type: String,
      required: false,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    myPlants:[{
      type: Schema.Types.ObjectId,
      ref: "Plants", 
      required: false
    }]
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);
module.exports = User;

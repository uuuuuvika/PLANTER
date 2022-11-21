const { Schema, model } = require("mongoose");

const plantBaseSchema = new Schema(
  {
    plantType: {
        type: String,
        require: true, 
        unique: true, 
        trim: true
    }, 
    h2o: {
        type: String,
        enum: ["ones per week", "twice per week", "ones per month", "ones per day"], 
        require: true
    }, 
    light: {
        type: String, 
        enum: ["low light", "direct light", "indirect light"], 
        require: true
    },
    bio: {
        type: String, 
        require: true,
        trim: true
    }
  },
  {
    timestamps: true,
  }
);

const PlantBase = model("PlantBase", plantBaseSchema);
module.exports = PlantBase;
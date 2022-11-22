const { Schema, model } = require("mongoose");

const plantBaseSchema = new Schema(
  {
    name : {
        type: String,
        required: false
    },
    plantType: {
        type: String,
        required: true, 
        unique: true, 
        trim: true
    }, 
    h2o: {
        type: String,
        enum: ["once per week", "twice per week", "once per month", "once per day"], 
        required: true
    }, 
    light: {
        type: String, 
        enum: ["low light", "direct light", "indirect light"], 
        required: true
    },
    bio: {
        type: String, 
        required: true,
        trim: true
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      require: false
    },
    adoptedBy: [{
      type: Schema.Types.ObjectId, // or default 
      ref: 'User',
      require: false
    }]
  },
  {
    timestamps: true,
  }
);

const PlantBase = model("PlantBase", plantBaseSchema);
module.exports = PlantBase;
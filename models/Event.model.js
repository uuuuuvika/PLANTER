const { Schema, model } = require("mongoose");

const eventSchema = new Schema(
    { 
    createdBy: [
        {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
],
    date: Date,
    name: String,
    description: String,
    coordinates: String,
    picture: String,
}
);

const Event = model("Event", eventSchema);
module.exports = Event

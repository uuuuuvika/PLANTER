const { Schema, model } = require("mongoose");

const eventSchema = new Schema(
    {
    // organizer: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true
    // },
    participants: [
        {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
],  
    invitetedUsers: [
        {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
],
    date: Date,
    name: String,
    description: String,
    coordinates: String,
}
);

const Event = model("Event", eventSchema);
module.exports = Event

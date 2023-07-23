const mongoose = require('mongoose');
const {Schema} = mongoose;

const ChatMessages = new Schema ({
    messages: {
        time: new Date().toLocaleString(),
        sender: {
            type: String
        },
        receiver: {
            type: String,
        },
    },
    roomID: {
        type: String,
        required: true,
    },
})
module.exports =  mongoose.model('ChatVerse Messages', ChatMessages);
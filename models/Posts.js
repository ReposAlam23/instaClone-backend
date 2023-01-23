const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    location: {
        type: String,
        require: true
    },
    imagefile: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    }
})

module.exports = {Posts: mongoose.model("InstaUser", UserSchema)}
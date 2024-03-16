const mongoose = require("mongoose");
const {MONGO_URL} =  require('./config')
mongoose.connect("mongodb+srv://anki:JJ0E3gg9jfafTknE@cluster0.4g2czen.mongodb.net/paytm");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    firstName: String,
    lastName: String,
    password: String
})

const accountSchema = mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    balance:{
        type: Number,
        required: true
    }
})

const User = mongoose.model("users", userSchema);
const Account = mongoose.model("accounts", accountSchema);


module.exports = {
    User,
    Account
}
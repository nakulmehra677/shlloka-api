const mongoose = require('mongoose');

const UserAccount = mongoose.model('user_account', new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        minlength: 3,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    date: {
        type: Date,
        default: Date.now
    }
}));

const _findById = async (_id) => {
    const user = await UserAccount.findOne({ _id: _id });
    // if(!user) throw new Error('NOT_FOUND');
    return user;
}

const _findByEmail = async (email) => {
    const user = await UserAccount.findOne({ email: email });
    // if(!user) throw new Error('NOT_FOUND');
    return user;
}

const _addUser = async (user) => {
    return await UserAccount(user).save();
}

exports.findById = _findById;
exports.findByEmail = _findByEmail;
exports.addUser = _addUser;

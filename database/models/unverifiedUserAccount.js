const mongoose = require('mongoose');

const UnverifiedUserAccount = mongoose.model('unverified_user_account', new mongoose.Schema({
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
    const user = await UnverifiedUserAccount.findOne({ _id: _id });
    // if(!user) throw new Error('NOT_FOUND');
    return user;
}

const _findByEmail = async (email) => {
    const user = await UnverifiedUserAccount.findOne({ email: email });
    // if(!user) throw new Error('NOT_FOUND');
    return user;
}

const _addUser = async (user) => {
    return await UnverifiedUserAccount(user).save();
}

const _deleteById = async (_id) => {
    return await UnverifiedUserAccount.deleteOne({ _id: _id });
}

const _deleteByEmail = async (email) => {
    return await UnverifiedUserAccount.deleteOne({ email: email });
}

exports.findById = _findById;
exports.findByEmail = _findByEmail;
exports.addUser = _addUser;
exports.deleteById = _deleteById;
exports.deleteByEmail = _deleteByEmail;
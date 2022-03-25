const jwt = require('jsonwebtoken');
const db = require("../database");
const UserTypeEnum = require('../enums/UserType.enum');
const UtilsEnum = require('../enums/Utils.enum');


const _authenticate = async (email, password, type) => {

    let user;

    if (type === UserTypeEnum.USER) {
        user = await db.models.userAccount.findByEmail(email);

        if (!user) throw new Error(UtilsEnum.NOT_FOUND);
        if (password !== user.password) throw new Error(UtilsEnum.WRONG_EMAIL_PASSWORD);
    }

    else throw new Error(UtilsEnum.WRONG_USER_TYPE);

    const token = jwt.sign({ _id: user._id, type: type }, 'jwtPrivateKey');

    return { token: token, email: user.email, _id: user._id, fullName: user.fullName }
}


module.exports.authenticate = _authenticate;
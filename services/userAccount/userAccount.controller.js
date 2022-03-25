const signupUserRequestSchema = require("./schemas/signupUser.request.schema");
const signinUserRequestSchema = require("./schemas/signinUser.request.schema");

const db = require("../../database");
const eml = require("../../lib/email");
const sessionManager = require("../../lib/session.manager");

const UtilsEnum = require('../../enums/Utils.enum');


const _signup = async (req, res) => {

    const result = signupUserRequestSchema.validate(req.body);
    if (result.error) {
        res.status(400).send(result.error);
        return;
    }

    const { fullName, email, password } = req.body;

    // Check whether user already exists.
    let user = await db.models.userAccount.findByEmail(email);
    if (user) return res.status(400).send("Email already registered.");

    // Invalidate existing link of email verification, if any.
    var unverifiedUser = await db.models.unverifiedUserAccount.findByEmail(email);
    if (unverifiedUser) await db.models.unverifiedUserAccount.deleteByEmail(email);

    user = await db.models.unverifiedUserAccount.addUser({
        fullName: fullName,
        email: email,
        password: password
    });

    // Start timer of 10 minutes to expire validation link.
    setTimeout(async function () {
        unverifiedUser = await db.models.unverifiedUserAccount.findById(user._id);
        if (unverifiedUser) await db.models.unverifiedUserAccount.deleteById(user._id);
    }, 1000 * 60 * 10);

    eml.models.verifyEmail(email, fullName, req.protocol + '://' + req.get('host') + '/user-account/verify-email/' + user._id);
    await user.save();

    res.send({ fullName: user.fullName, email: user.email, password: user.password });
}


const _verifyEmail = async (req, res) => {

    const _id = req.params._id;

    let user = await db.models.unverifiedUserAccount.findById(_id);
    if (!user) return res.status(200).send("Verification Link Expired.");

    try {
        db.models.userAccount.addUser({
            fullName: user.fullName,
            email: user.email,
            password: user.password
        });
    } catch (e) {
        res.status(500).send('Server Error');
    }

    await db.models.unverifiedUserAccount.deleteById(_id);

    res.send('<div>Email Verfied. Signin on <a href="https://sllloka.web.app/signin">https://sllloka.web.app/signin</a></div>');
}


const _siginin = async (req, res) => {

    const result = signinUserRequestSchema.validate(req.body);
    if (result.error) {
        res.status(400).send(result.error);
        return;
    }

    const { email, password } = req.body;

    try {
        const data = await sessionManager.authenticate(email, password, 'USER');

        res
            .header('x-auth-token', data.token)
            .header('access-control-expose-headers', 'x-auth-token')
            .send({ fullName: data.fullName, email: data.email, _id: data._id });
    } catch (e) {
        if (e.message === UtilsEnum.NOT_FOUND) return res.status(404).send("Account with this email address not registered.");
        if (e.message === UtilsEnum.WRONG_EMAIL_PASSWORD) return res.status(401).send("Wrong email/password");
        else return res.status(500).send('Server Error');
    }
}

exports.signup = _signup;
exports.verifyEmail = _verifyEmail;
exports.signin = _siginin;
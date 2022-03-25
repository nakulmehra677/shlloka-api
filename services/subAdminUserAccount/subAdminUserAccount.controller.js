const signupSubAdminUserRequestSchema = require("./schemas/signupSubAdminUser.request.schema");


const _signup = (req, res) => {

    const result = signupUserRequestSchema.validate(req.body);
    if (result.error) {
        res.status(400).send(result.error);
        return;
    }

    res.send("OK");
}

exports.signup = _signup;
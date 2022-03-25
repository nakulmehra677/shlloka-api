const utils = require('../lib/utils.manager')

const Utils = utils.enumObjectFromKeys([
    'NOT_FOUND',
    'WRONG_EMAIL_PASSWORD',
    'WRONG_USER_TYPE'
])

module.exports = Utils;

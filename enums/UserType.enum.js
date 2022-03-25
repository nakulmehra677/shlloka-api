const utils = require('../lib/utils.manager')

const UserType = utils.enumObjectFromKeys([
    'USER',
    'SUB_ADMIN_USER',
    'ADMIN_USER'
])

module.exports = UserType

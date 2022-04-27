const crypto = require('crypto');
const dotenv = require("dotenv");

dotenv.config()

const generateMD5 = (value) => {
    return crypto.createHash('sha256', process.env.SECRET_KEY).update(value).digest("hex")
}

module.exports = {generateMD5}
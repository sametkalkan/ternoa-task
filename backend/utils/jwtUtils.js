const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

module.exports = {
    encodeData: (data) => jwt.sign(data, secret),
    verify: (token) => {
        if (token) {
            try {
                return jwt.verify(token, secret);
            } catch (err) {
                return false;
            }
        }
        return false;
    },
    decodeToken: (token) => {
        if (token) {
            try {
                return jwt.decode(token, secret);
            } catch (error) {
                return false;
            }
        }
        return false;
    }
}
;

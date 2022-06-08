const UserModel = require('../modules/user/userModel');
const JwtUtil = require('./jwtUtils');

const auth = {};
// check authentication
auth.authenticateUser = async (req, res, next) => {
    let token = req.headers && req.headers['x-auth-token'];

    const userTokenData = JwtUtil.decodeToken(token);

    // if (utils.empty(userTokenData)) {
    //     return res.status(401).json({
    //         message: 'NOT_AUTHORIZED',
    //         status: false
    //     });
    // }
    if (!userTokenData) {
        return res.status(200).json({
            message: 'NOT_FOUND',
            status: false
        });
    }
    const user = await UserModel.findById(userTokenData.id);
    if (user) {
        req.body.walletAddress = user.walletAddress;
        req.body.userId = user.id;
        return next();
    } else {
        return res.status(401).json({
            message: 'NOT_AUTHORIZED',
            status: false
        });
    }
};

module.exports = auth;

const UserModel = require('./userModel');
const Web3Utils = require('../../utils/web3Utils');
const JwtUtils = require('../../utils/jwtUtils');
const crypto = require('crypto');

module.exports = {
    login: async (req, res) => {
        const {data, signature} = req.body;
        const signer = await Web3Utils.recover(data, signature);
        if (!signer) {
            return res.status(400).json({
                message: 'INVALID_SIGNATURE',
                status: false,
            });
        }

        let user = await UserModel.findOne({walletAddress: signer});
        if (!user) {
            const createUser = new UserModel({
                walletAddress: signer
            });
            user = await createUser.save();
        }

        const token = JwtUtils.encodeData({
            id: user.id,
            walletAddress: user.walletAddress,
        });

        return res.status(200).json({
            message: 'LOGIN_SUCCESS',
            status: true,
            data: {
                token: token,
                id: user.id,
                walletAddress: user.walletAddress
            }
        });
    },
    getUserInfo: async (req, res) => {
        const {userId} = req.body;
        let user = await UserModel.findOne({_id: userId});

        if (!user) {
            return res.status(200).json({
                message: 'USER_NOT_FOUND',
                status: false,
            });
        }
        return res.status(200).json({
            message: 'USER_FOUND',
            status: true,
            data: {
                id: user.id,
                walletAddress: user.walletAddress
            }
        });
    }
};
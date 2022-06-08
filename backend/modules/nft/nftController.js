const NftModel = require("./nftModel");

module.exports = {
    getNftsPagination: async (req, res) => {
        const {offset, limit, userId} = req.query;
        let query = {};
        if (userId) {
            query.ownerId = userId;
        }
        const nfts = await NftModel.find(query)
            .populate({
                path: 'ownerId',
                select: {_id: 1, walletAddress: 1},
            })
            .sort({createdAt: -1})
            .skip(offset * limit)
            .limit(limit);
        return res.status(200).json({
            status: true,
            data: nfts
        })
    },

    getOneNft: async (req, res) => {
        const {id} = req.query;
        let query = {_id: id};
        const nft = await NftModel.findOne(query)
            .populate({
                path: 'ownerId',
                select: {_id: 1, walletAddress: 1},
            });
        if (!nft) {
            return res.status(400).json({
                status: false,
                message: "NFT_NOT_FOUND"
            })
        }
        return res.status(200).json({
            status: true,
            data: nft
        })
    },

    createNft: async (req, res) => {
        const {image, title, description, userId, price} = req.body;
        const createNewNft = await new NftModel({
            image: image,
            title: title,
            description: description,
            ownerId: userId,
            price: price,
        });
        if (!createNewNft) {
            return res.status(400).json({
                status: false,
                message: "NFT_CREATION_FAILED"
            });
        }
        await createNewNft.save();
        return res.status(200).json({
            status: true,
            message: "NFT_CREATED_SUCCESSFULLY"
        });
    },

    updateNft: async (req, res) => {
        const {id, userId, image, title, description, price} = req.body;
        let nft = await NftModel.findOne({_id: id, ownerId: userId});
        if (!nft) {
            return res.status(400).json({
                status: false,
                message: "NFT_NOT_FOUND"
            });
        }

        if (image) {
            nft.image = image;
        }
        if (title) {
            nft.title = title;
        }
        if (description) {
            nft.description = description;
        }
        if (price) {
            nft.price = price;
        }
        await nft.save();
        return res.status(200).json({
            status: true,
            message: "NFT_UPDATED_SUCCESSFULLY"
        });
    },

    deleteNft: async (req, res) => {
        const {userId} = req.body;
        const id = req.query.id;
        let nft = await NftModel.findOne({_id: id, ownerId: userId});
        if (!nft) {
            return res.status(400).json({
                status: false,
                message: "NFT_NOT_FOUND"
            });
        }
        await nft.remove();
        return res.status(200).json({
            status: true,
            message: "NFT_DELETED_SUCCESSFULLY"
        });
    },
};
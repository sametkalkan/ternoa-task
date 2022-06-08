const mongoose = require('mongoose');

const {Schema} = mongoose;

const nftSchema = new Schema({
        image: {
            type: String,
            default: null,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: false,
            default: null,
        },
        ownerId: {
            type: Schema.Types.ObjectId,
            ref: 'users',
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
        toJSON: {
            getters: true,
        },
    }
);
module.exports = mongoose.model('nfts', nftSchema);

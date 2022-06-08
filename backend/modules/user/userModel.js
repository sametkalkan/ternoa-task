const mongoose = require("mongoose");
const {Schema} = mongoose;


const userSchema = new Schema(
    {
        walletAddress: {
            type: String,
            required: true,
            lowercase: true,
            unique: true,
        },
        nftCreated: {
            type: Number,
            default: 0,
        },
    },

    {
        timestamps: true,
        toJSON: {
            getters: true,
        },
    }
);
module.exports = mongoose.model("users", userSchema);

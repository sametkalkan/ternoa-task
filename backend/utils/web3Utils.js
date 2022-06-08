const Web3 = require('web3');

const web3 = new Web3();

module.exports = {
    recover: async (data, signature) => {
        return await web3.eth.accounts.recover(data, signature);
    }
};

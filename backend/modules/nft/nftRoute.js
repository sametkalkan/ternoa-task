const express = require('express');
const NftController = require('./nftController');
const NftMiddleware = require('./nftMiddleware');
const auth = require('../../utils/auth');
const router = express.Router();

router.get('/paged', NftController.getNftsPagination);
router.get('/', NftController.getOneNft);
router.post('/', NftMiddleware.validateCreateNft, auth.authenticateUser, NftController.createNft);
router.put('/', NftMiddleware.validateNft, auth.authenticateUser, NftController.updateNft);
router.delete('/', auth.authenticateUser, NftController.deleteNft);


module.exports = router;

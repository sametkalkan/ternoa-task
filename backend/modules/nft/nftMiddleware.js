const Joi = require('joi');
const validate = require('../../utils/validateRequest');

module.exports = {
    validateNft: (req, res, next) => {
        const schema = Joi.object({
            id: Joi.string().required(),
            image: Joi.string(),
            title: Joi.string(),
            description: Joi.string(),
            price: Joi.number()
        });
        validate.validateRequest(req, res, next, schema);
    },
    validateCreateNft: (req, res, next) => {
        const schema = Joi.object({
            image: Joi.string(),
            title: Joi.string(),
            description: Joi.string(),
            price: Joi.number()
        });
        validate.validateRequest(req, res, next, schema);
    },
};
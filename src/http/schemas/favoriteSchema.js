const Joi = require('@hapi/joi');

exports.getUserFavoritesProducts = Joi.object({
    headers: Joi.object({
        authorization: Joi.string().required(),
    }),
});

exports.favoriteProduct = Joi.object({
    body: Joi.object({
        productId: Joi.string().required(),
    })
});

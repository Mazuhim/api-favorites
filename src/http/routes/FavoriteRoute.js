const express = require("express");
const FavoriteController = require("../controllers/FavoriteController");
const SchemaValidator = require("../middlewares/schemaValidator");
const favoriteSchema = require("../schemas/favoriteSchema");
const authentication = require('../middlewares/auth');
const auth = authentication();

const router = express.Router({ mergeParams: true });

/**
* @typedef Favorite
* @property {string} productId.required - product id
*/

/**
* @typedef FavoriteResponse
* @property {number} price.required - price product
* @property {string} image.required - url image product
* @property {string} brand.required - brand product
* @property {string} id.required - id product
* @property {string} title.required - title product
* @property {number} reviewScore - review score product
*/


/**
 * Endpoint get favorites
 * @route GET /favorites
 * @group /favorites - Operations about favorites
 * @produces application/json
 * @consumes application/json
 * @returns {FavoriteResponse.model} 200 - Created
 * @returns {Error}  400 - Bad Request
 * @returns {Error}  500 - Erro inesperado...
 */
/* POST /favorites */
router.get(
  "/",
  SchemaValidator(favoriteSchema.getUserFavoritesProducts),
  auth.authenticate(),
  FavoriteController.getUserFavoritesProducts.bind(FavoriteController)
);


/**
 * Endpoint to insert product in favorites list
 * @route POST /favorites
 * @group /favorites - Operations about favorites
 * @param {Favorite.model} body.body.required - favorite data
 * @produces application/json
 * @consumes application/json
 * @returns {} 201 - Created
 * @returns {Error}  400 - Bad Request
 * @returns {Error}  500 - Erro inesperado...
 * @returns {Error}  400 - Esse produto ja esta na sua lista de favoritos...
 */
/* POST /favorites */
router.post(
  "/",
  SchemaValidator(favoriteSchema.favoriteProduct),
  auth.authenticate(),
  FavoriteController.favoriteProduct.bind(FavoriteController)
);

module.exports = router;

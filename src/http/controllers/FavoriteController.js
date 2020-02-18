const container = require("../../container");
const {
  ResourceNotFoundError,
} = require("../../errors");
const logger = require("../../logger");

class FavoriteController {
  /**
   * @param {import('../../container').Container} container
   */
  constructor(container) {
    this.favoriteService = container.favoriteService;
  }

  /**
   * Busca lista de produtos favoritos do usuario logado.
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async getUserFavoritesProducts(req, res, next) {
    try {
      const favorites = await this.favoriteService.getUserFavoritesProducts(req.user);
      res.send(favorites);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Insere um produto na lista de favoritos do usuario logados.
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async favoriteProduct(req, res, next) {
    try {
      const { productId } = req.body;
      logger.info(`Product id ${JSON.stringify(productId)}`);
      await this.favoriteService.favoriteProduct({ userUuid: req.user.uuid, productId });

      res.status(201).send();
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new FavoriteController(container);

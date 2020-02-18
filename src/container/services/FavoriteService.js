const {
  ResourceNotFoundError, ResourceAlreadyExistsError
} = require("../../errors");

class FavoriteService {
  /**
   * @param {import('../index').ServiceContainer} container
   */
  constructor(container) {
    this.product = container.product;
    this.favoriteModel = container.favoriteModel;
  }

  /**
  * @return {import('../integrations/Product').ProductResponse[]?}
  */
  async getUserFavoritesProducts(data) {
    try {
      const favorites = await this.favoriteModel.getByUserUuid(data.uuid);
      if (!favorites) throw new ResourceNotFoundError();
      const favoriteProducts = [];
      for (const fav of favorites) {
        const productEntity = await this.product.getProductById(fav.productId);
        favoriteProducts.push(productEntity);
      }

      return favoriteProducts;
    } catch (err) {
      throw err;
    }
  }

  async favoriteProduct(data) {
    const { productId, userUuid } = data;
    const product = await this.product.getProductById(productId);
    if (!product) throw new ResourceNotFoundError('Esse produto não existe...');

    const productExistInFavoriteList = await this.favoriteModel.get({ productId, userUuid });
    if (productExistInFavoriteList && productExistInFavoriteList.length > 0) {
      console.log();
      throw new ResourceAlreadyExistsError('Esse produto ja esta na sua lista de favoritos');
    }
    return this.favoriteModel.create({ userUuid, productId });
  }

}

module.exports = FavoriteService;

const HttpIntegration = require("./HttpIntegration");
const { PRODUCTS_URL } = require("../../env");
const logger = require('../../logger');

/**
* @typedef ProductResponse
* @type {Object}
* @property {String} id
* @property {Number} price
* @property {Number} reviewScore
* @property {String} image
* @property {String} brand
* @property {String} title
*/

class Product extends HttpIntegration {
  constructor() {
    super({
      baseURL: PRODUCTS_URL,
      timeout: 60000,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    });
  }

  /**
   * @param {String} idProduct
   * @return {ProductResponse?}
   */
  async getProductById(productId) {
    try {
      const response = await this.instance.get(
        `/${productId}`
      );
      const product = response.data;
      return product;
    } catch (err) {
      logger.error(`error: ${err}`);
      if (
        (err.response && err.response.status === 404) ||
        (err.response && err.response.status === 400)
      ) {
        return null;
      }
      throw err;
    }
  }

  /**
   * @param {Number} page
   * @return {ProductResponse[]?}
   */
  async getProducts(page) {
    try {
      const response = await this.instance.get(
        `/?page=${page}`
      );
      const products = response.data;
      return products;
    } catch (err) {
      logger.error(`error: ${err}`);
      if (
        (err.response && err.response.status === 404) ||
        (err.response && err.response.status === 400)
      ) {
        return null;
      }
      throw err;
    }
  }
}
module.exports = Product;

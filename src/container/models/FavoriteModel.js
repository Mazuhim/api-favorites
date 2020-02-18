const Model = require("./Model");

/**
 * @typedef Favorite
 * @type {Object}
 * @property {Number} id
 * @property {String} userUuid
 * @property {String} productId
 * @property {Date} createdAt
 * @property {Date} updatedAt
 * @property {Date} updatedAt
 */

class FavoriteModel extends Model {
  constructor(database) {
    super(database, "favorite");
  }

  /**
   * @param {Favorite} data
   * @return {import('./Model').ResultTransaction<Number[]>}
   */
  create(data) {
    return this.table.insert(data).returning("id");
  }

  /**
   * @param {Number} id
   * @return {import('./Model').ResultTransaction<FavoriteModel?>}
   */
  getById(id) {
    return this.table.where("id", id).first();
  }

  /**
   * @param {Number} productId
   * @return {import('./Model').ResultTransaction<FavoriteModel?>}
   */
  getByProductId(productId) {
    return this.table.where("productId", productId);
  }

  /**
  * @param {Number} userUuid
  * @return {import('./Model').ResultTransaction<FavoriteModel?>}
  */
  getByUserUuid(userUuid) {
    return this.table.where("userUuid", userUuid);
  }

  /**
   */
  get(properties, page, limit) {
    let offset;
    if (page > 1) {
      offset = limit * page - limit;
    }
    return this.table
      .where(properties)
      .limit(limit)
      .offset(offset);
  }

  /**
   * @param {Favorite} data
   * @return {import('./Model').ResultTransaction<Favorite?>}
   */
  async update(id, data) {
    await this.table.update(data).where("id", id);
    return this.table.where("id", id);
  }
}

module.exports = FavoriteModel;

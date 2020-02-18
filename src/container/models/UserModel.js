const Model = require("./Model");

/**
 * @typedef User
 * @type {Object}
 * @property {Number} id
 * @property {String} uuid
 * @property {String} name
 * @property {String} email
 * @property {String} password
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */

class UserModel extends Model {
  constructor(database) {
    super(database, "user");
  }

  /**
   * @param {User} data
   * @return {import('./Model').ResultTransaction<Number[]>}
   */
  create(data) {
    return this.table.insert(data).returning("id");
  }

  /**
   * @param {String} uuid
   * @return {import('./Model').ResultTransaction<User?>}
   */
  getByUuid(uuid) {
    return this.table.where("uuid", uuid).first('email', 'uuid', 'createdAt', 'updatedAt');
  }

  /**
   * @param {Object} params
   * @return {import('./Model').ResultTransaction<User?>}
   */
  findByEmailAndPassword(params) {
    return this.table.where(params).whereNull('deletedAt').first('email', 'uuid', 'createdAt', 'updatedAt');
  }

  /**
   * Buscar transações
   * @param {name, email} properties
   * @param {Number} page
   * @param {Number} limit
   * @return {import('./Model').ResultTransaction<User[]>}
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
   * @param {User} data
   * @return {import('./Model').ResultTransaction<User?>}
   */
  async update(uuid, data) {
    await this.table.update(data).where("uuid", uuid);
    return this.table.where("uuid", uuid).first('id', 'email', 'uuid', 'createdAt', 'updatedAt');
  }
}

module.exports = UserModel;

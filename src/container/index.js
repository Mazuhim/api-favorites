const knex = require("knex");
const { NODE_ENV } = require("../env");
const logger = require("../logger");
const knexFile = require("../../knexfile");

/** Models */
const UserModel = require("./models/UserModel");
const FavoriteModel = require("./models/FavoriteModel");

/** Services */
const FavoriteService = require("./services/FavoriteService");
const UserService = require("./services/UserService");

/** Integrations */
const Product = require("./integrations/Product");

const database = knex(knexFile);

if (NODE_ENV === "development") {
  database.on("query", query => {
    let { sql } = query;
    if (query.bindings) {
      query.bindings.forEach(binding => {
        sql = sql.replace("?", binding);
      });
    }
    logger.info(sql);
  });
}

if (NODE_ENV === "production") {
  database.migrate.latest();
}

/**
 * @typedef ModelContainer
 * @type {Object}
 * @property {UserModel} userModel
 * @property {FavoriteModel} favoriteModel
 */

/** @type {ModelContainer} */
const models = {
  userModel: new UserModel(database),
  favoriteModel: new FavoriteModel(database)
};

/**
 * @typedef IntegrationContainer
 * @property {Product} product
 */

/** @type {IntegrationContainer} */
const integrations = {
  product: new Product(),
};

/**
 * @typedef ServiceContext
 * @type {ModelContainer & IntegrationContainer}
 */

/** @type {ServiceContext} */
const serviceContext = {
  ...models,
  ...integrations
};

/**
 * @typedef ServiceContainer
 * @type {Object}
 * @property {FavoriteService} favoriteService
 * @property {UserService} userService
 */

/** @type {ServiceContainer} */
const services = {
  favoriteService: new FavoriteService(serviceContext),
  userService: new UserService(serviceContext)
};

/**
 * @typedef Container
 * @type {ServiceContainer}
 */

/** @type {Container} */
const container = {
  ...services
};

module.exports = container;

const express = require("express");
const UserController = require("../controllers/UserController");
const SchemaValidator = require("../middlewares/schemaValidator");
const userSchema = require("../schemas/userSchema");
const authentication = require('../middlewares/auth');
const auth = authentication();

const router = express.Router({ mergeParams: true });

/**
 * @typedef UserCreation
 * @property {string} name.required - user full name
 * @property {string} email.required - user email
 * @property {string} password.required - user password
 * @property {string} passwordConfirmation.required - user password confirmation
 */

/**
* @typedef UserUpdate
* @property {string} email - user email
* @property {string} password - user password
*/

/**
 * @typedef UserResponse
 * @property {string} name - user full name
 * @property {string} email - user email
 * @property {string} password - user password
 * @property {date} createdAt - user creation date 
 * @property {date} UpdatedAt - user updated date
 */

/**
* @typedef UserAuthData
* @property {string} uuid.required - unique identifier
* @property {string} name.required - user full name
* @property {string} email.required - user email
*/

/**
 * @typedef AuthenticationResponse
 * @property {string} token.required - jwt auth token
 * @property {UserAuthData.model} user.required - authenticated user
 */

/**
* @typedef LoginData
* @property {string} email.required - user email
* @property {string} password.required - user password
*/


/**
 * Endpoint to create one user
 * @route POST /users
 * @group /users - Operations about users
 * @param {UserCreation.model} body.body.required - user data
 * @produces application/json
 * @consumes application/json
 * @returns {} 201 - Created
 * @returns {Error}  400 - Bad Request
 * @returns {Error}  500 - Erro inesperado...
 * @returns {Error}  400 - Já existe um usuario com esse email...
 */
/* POST /users */
router.post(
  "/",
  SchemaValidator(userSchema.create),
  UserController.create.bind(UserController)
);

/**
  * Endpoint to authenticate user using email and password
  * @route POST /users/login
  * @group /users - Operations about users
  * @param {LoginData.model} body.body.required - credentials
  * @produces application/json
  * @consumes application/json
  * @returns {AuthenticationResponse.model} 200 - Returns an auth token and the user
  * @returns {Error}  401 - Email ou password incorreto
  * @returns {Error}  400 - Bad Request
  * @returns {Error}  500 - Erro inesperado...
  */
/* POST /users/login */
router.post(
  "/login",
  SchemaValidator(userSchema.login),
  UserController.login.bind(UserController)
);

/**
  * Endpoint to get user using uuid
  * @route GET /users/:uuid
  * @group /users - Operations about users
  * @param {String} uuid - uuid user
  * @produces application/json
  * @consumes application/json
  * @returns {UserResponse.model} 200 - Returns an auth token and the user
  * @returns {Error}  401 - Email ou password incorreto
  * @returns {Error}  400 - Bad Request
  * @returns {Error}  500 - Erro inesperado...
  */
/* GET /users/:uuid */
router.get(
  "/:uuid",
  SchemaValidator(userSchema.get),
  auth.authenticate(),
  UserController.getByUuid.bind(UserController)
);


/**
  * Endpoint to get users list
  * @route GET /users
  * @group /users - Operations about users
  * @produces application/json
  * @consumes application/json
  * @returns {UserResponse.model} 200 - Returns list of users
  * @returns {Error}  400 - Bad Request
  * @returns {Error}  500 - Erro inesperado...
  */
/* GET /users */
router.get(
  "/",
  SchemaValidator(userSchema.getByQueryParams),
  auth.authenticate(),
  UserController.get.bind(UserController)
);


/**
  * Endpoint to edit user using uuid and authentication
  * @route PATCH /users
  * @group /users - Operations about users
  * @param {UserUpdate.model} body.body.required - credentials
  * @param {string} uuid - uuid user
  * @produces application/json
  * @consumes application/json
  * @returns {UserResponse.model} 200 - Returns user updated
  * @returns {Error}  400 - Bad Request
  * @returns {Error}  500 - Erro inesperado...
  */
/* PATCH /users */
router.patch(
  "/:uuid",
  SchemaValidator(userSchema.update),
  auth.authenticate(),
  UserController.update.bind(UserController)
);

/**
  * Endpoint to delete user using uuid and authentication
  * @route DELETE /users
  * @group /users - Operations about users
  * @param {string} uuid - credentials
  * @produces application/json
  * @consumes application/json
  * @returns {} 204 
  * @returns {Error}  400 - Bad Request
  * @returns {Error}  500 - Erro inesperado...
  */
/* DELETE /users */
router.delete(
  "/:uuid",
  SchemaValidator(userSchema.update),
  auth.authenticate(),
  UserController.delete.bind(UserController)
);

module.exports = router;

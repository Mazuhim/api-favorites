const container = require('../../container');
const {
  ValidationError,
  ResourceNotFoundError
} = require('../../errors');
const logger = require('../../logger');

class UserController {
  /**
   * @param {import('../../container').Container} container
   */
  constructor(container) {
    this.userService = container.userService;
  }

  /**
   * Cria novo usuario.
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async create(req, res, next) {
    try {
      const { body } = req;
      logger.info(`body: ${JSON.stringify(body)}`);
      const user = await this.userService.createUser(body);
      res.send(user);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Login.
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async login(req, res, next) {
    try {
      const { body } = req;
      logger.info(`body: ${JSON.stringify(body)}`);
      const authData = await this.userService.login(body);
      res.send(authData);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Retorna usuario por UUID.
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async getByUuid(req, res, next) {
    try {
      const { uuid } = req.params;
      const user = await this.userService.getByUuid(uuid);

      res.send(user);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Retorna usuarios
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async get(req, res, next) {
    try {
      const queryParams = req.query;
      const user = await this.userService.get(queryParams);
      res.send(user);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Edita usuario por UUID.
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async update(req, res, next) {

    try {
      const { uuid } = req.params;
      if (uuid !== req.user.uuid) throw new ValidationError('Usuário não autorizado...');
      const data = req.body;
      const user = await this.userService.update({ uuid, data });

      res.send(user);
    } catch (err) {
      next(err);
    }
  }

  /**
   * deleta usuario por UUID.
   *
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   * @param {import('express').NextFunction} next
   */
  async delete(req, res, next) {
    console.log(req);
    try {
      const { uuid } = req.params;
      if (uuid !== req.user.uuid) throw new ValidationError('Usuário não autorizado...');
      const user = await this.userService.delete(uuid);

      res.send(user);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new UserController(container);

const uuidv4 = require('uuid/v4');
const md5 = require('md5');
const jwt = require('jwt-simple');
const { JWTSECRET } = require('../../env');
const {
  ResourceNotFoundError,
  ResourceAlreadyExistsError
} = require("../../errors");
const { serviceHelper } = require("../../helpers");
const salt = '§}-{4Я€€4†ЯΩ(]{§';

class UserService {
  /**
   * @param {import('../index').ServiceContext} container
   */
  constructor(container) {
    this.userModel = container.userModel;
    this.favoriteModel = container.favoriteModel;
    this.product = container.product;
  }

  /**
  * @param {import('../models/UserModel').User} data
  * @return {import('../models/UserModel').User}
  */
  async createUser(data) {
    const existUser = await this.userModel.get({ email: data.email });
    console.log(existUser);
    if (existUser && existUser.length > 0) throw new ResourceAlreadyExistsError('Já existe um usuario com esse email...');

    data.password = md5(data.password + salt);
    data.uuid = uuidv4();
    delete data.passwordConfirmation;
    return this.userModel.create(data);
  }

  async login(data) {
    const user = await this.findByEmailAndPassword(data);
    console.log(user);
    if (!user || user.length < 1) throw new ResourceNotFoundError('Email ou Password incorreto...');

    const payload = {
      id: user.id,
      uuid: user.uuid,
      name: user.name,
    };

    const token = jwt.encode(payload, JWTSECRET);

    return { token, user };
  }

  /**
  * @param {String} uuid 
  * @return {import('../models/UserModel').User}
  */
  getByUuid(uuid) {
    return this.userModel.getByUuid(uuid);
  }

  async findByEmailAndPassword({ email, password }) {
    password = md5(password + salt);
    console.log(password);
    return this.userModel.findByEmailAndPassword({ email, password });
  }


  /**
   * Retorna uma lista de usuarios com base nos parametros.
   * @param {name, email, uuid, page, limit} queryParams
   * @return {import('../models/UserModel').User[]}
   */
  async get(queryParams) {
    const { page, limit } = queryParams;
    const filters = ['name', 'email', 'uuid'];
    const properties = await serviceHelper.filterSearchParams(queryParams, filters);
    const resultSet = await this.userModel.get(properties, +page || 0, +limit || 20);

    if (resultSet.length === 0) {
      throw new ResourceNotFoundError();
    }
    resultSet.forEach((result) => {
      delete result.password;
      delete result.deletedAt;
      delete result.id;
    });
    return resultSet;
  }

  update({ data, uuid }) {
    console.log(data, ' , ', uuid);
    if (data.password) {
      data.password = md5(data.password + salt);
    }

    return this.userModel.update(uuid, data);
  }

  delete(uuid) {
    return this.userModel.update(uuid, { deletedAt: new Date() });
  }
}

module.exports = UserService;

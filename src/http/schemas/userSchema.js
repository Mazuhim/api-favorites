const Joi = require('@hapi/joi');

const id = Joi.string();

exports.create = Joi.object({
  body: Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().min(3).required(),
    password: Joi.string().min(3).max(15).required(),
    passwordConfirmation: Joi.any().valid(Joi.ref('password')).required().options({ language: { any: { allowOnly: 'must match password' } } }),
  }),
});

exports.login = Joi.object({
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(15).required(),
  }),
});

exports.get = Joi.object({
  params: Joi.object({
    uuid: id.required(),
  }),
});

exports.getByQueryParams = Joi.object({
  query: Joi.object({
    name: Joi.string(),
    email: Joi.string(),
    limit: Joi.number().positive(),
    page: Joi.number().positive(),
  })
});

exports.update = Joi.object().keys({
  params: Joi.object({
    uuid: id.required(),
  }),
  body: Joi.object().keys({
    email: Joi.string().email(),
    name: Joi.string().min(3),
    password: Joi.string().min(3).max(15),
  }),
});

exports.delete = Joi.object().keys({
  params: Joi.object({
    uuid: id.required(),
  }),
});
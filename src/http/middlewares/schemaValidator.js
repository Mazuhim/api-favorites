const Joi = require("@hapi/joi");

const { ValidationError } = require("../../errors");

module.exports = schema => {
  return (req, res, next) => {
    const validation = Joi.validate(req, schema, {
      abortEarly: false,
      stripUnknown: true,
      allowUnknown: true
    });

    if (validation.error) {
      return next(
        new ValidationError(
          "error.validation",
          validation.error.details
        )
      );
    }

    Object.assign(req, validation.value);

    return next();
  };
};

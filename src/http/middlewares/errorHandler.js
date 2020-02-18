const {
  ResourceAlreadyExistsError,
  NotFoundError,
  ResourceNotFoundError,
  ValidationError,
  UnavailableServiceError,
} = require('../../errors');

const logger = require('../../logger');

/**
     *
     * @param {import('express').Request} req
     * @param {import('express').Response} res
     * @param {import('express').NextFunction} next
     */
module.exports = (err, req, res, next) => {
  logger.warn(err);

  if (err instanceof NotFoundError) {
    res.status(404).send(err);
    return;
  }

  if (err instanceof ResourceNotFoundError) {
    res.status(404).send(err);
    return;
  }

  if (
    err instanceof ResourceAlreadyExistsError ||
    err instanceof UnavailableServiceError ||
    err instanceof ValidationError
  ) {
    res.status(400).send(err);
    return;
  }

  if (err.code === 'ER_DUP_ENTRY') {
    res
      .status(409)
      .send({ code: 'DUPLICATED_RESOURCE', message: 'Recurso duplicado...' });
  } else {
    res.status(500).send({ code: 'UNEXPECTED_ERROR', message: 'Erro inesperado...' });
  }

  next();
};

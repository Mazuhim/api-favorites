const env = require("./env");
const http = require("./http");
const logger = require("./logger");

setImmediate(() => {
  http.listen(env.PORT, () => {
    logger.info(`Servidor iniciado na porta: ${env.PORT}`);
  });
});

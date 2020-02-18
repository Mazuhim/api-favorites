require('dotenv').config();

module.exports = {
  /* Database */
  DB_HOST: process.env.DB_HOST,
  DB_PORT: parseInt(process.env.DB_PORT, 10),
  DB_DATABASE: process.env.NODE_ENV === 'test' ? process.env.DB_DATABASE_TEST : process.env.DB_DATABASE,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,

  /* Application */
  PORT: parseInt(process.env.PORT, 10) || 3000,
  NODE_ENV: process.env.NODE_ENV,
  BODY_LIMIT: process.env.BODY_LIMIT || '5000kb',

  /* Settings */
  PRODUCTS_URL: process.env.PRODUCTS_URL,
  JWTSECRET: process.env.JWTSECRET,
};


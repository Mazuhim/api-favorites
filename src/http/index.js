const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");
const compression = require("compression");
const morgan = require("morgan");
const NODE_ENV = require("../env").NODE_ENV;
const swaggerUi = require('express-swaggerize-ui');

/* Routes */
const userRoute = require("./routes/UserRoute");
const favoriteRoute = require("./routes/FavoriteRoute");

/* Middlewares */
const errorHandler = require("./middlewares/errorHandler");

/* Express initialization */
const app = express();

const options = {
  swaggerDefinition: {
    info: {
      description: 'This is a favorite-serrvice',
      title: 'Favorite APIs',
      version: '1.0.0',
    },
    host: `localhost:${process.env.PORT}`,
    basePath: '/',
    produces: [
      'application/json',
    ],
    schemes: ['http', 'https'],
    securityDefinitions: {
      JWT: {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization',
        description: '',
      },
    },
  },
  swaggerOptions: {
    authAction: { JWT: { name: "JWT", schema: { type: "apiKey", in: "header", name: "Authorization", description: "" }, value: "Bearer <JWT>" } }
  },
  basedir: __dirname, // app absolute path
  files: ['./routes/**/*.js'], // Path to the API handle folder
};

const expressSwagger = require('express-swagger-generator')(app);

expressSwagger(options);

app.use('/docs', swaggerUi());


app.use('/api/', (req, res) => {
  res.json(require('./path/to/swaggerize/docs.json'));
});

/* Express utilites */
app.use(morgan("combined"));
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(
  bodyParser.json({
    limit: process.env.BODY_LIMIT
  })
);
/* Status endpoint */
app.get(["/info", "/status"], async (req, res, next) => {
  try {
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

if (NODE_ENV === "production") {
  // app.use(auth(['ADMIN']));
}

/* Instatiate routes */
app.use("/users", userRoute);
app.use("/favorites", favoriteRoute);

app.all("*", (req, res, next) => {
  next(res.send(req));
});

app.use(errorHandler);

module.exports = app;

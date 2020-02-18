const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const { userService } = require('../../container');

module.exports = () => {
  const authConfig = {
    jwtSecret: process.env.JWTSECRET,
    jwtSession: {
      session: false,
    },
  };

  const opts = {};
  opts.secretOrKey = authConfig.jwtSecret;
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

  const strategy = new Strategy(opts, async (payload, done) => {
    const user = await userService.getByUuid(payload.uuid);

    if (user) {
      return done(null, user);
    }

    return done(null, null);
  });

  passport.use(strategy);

  return {
    initialize: () => passport.initialize(),
    authenticate: () => passport.authenticate('jwt', authConfig.jwtSession),
  };
};

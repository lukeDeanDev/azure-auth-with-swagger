const passport = require('passport');
const { BearerStrategy } = require('passport-azure-ad');

module.exports = ({ tenantId, clientId }) => {
  passport.use(
    new BearerStrategy(
      {
        identityMetadata: `https://login.microsoftonline.com/${tenantId}/v2.0/.well-known/openid-configuration`,
        clientID: clientId,
        loggingLevel: 'warn',
        loggingNoPII: false,
      },
      (token, done) => {
        // TODO Do something useful with the trusted decoded token.
        const { preferred_username } = token; // eslint-disable-line camelcase
        done(null, preferred_username); // done is the custom callback on passport.authenticate
      },
    ),
  );
  return (req, res, next) => {
    const customCallback = (err, user, info) => {
      if (err) {
        next(err);
        return;
      }
      if (!user) {
        next(new Error(info));
        return;
      }
      req.userName = user;
      next();
    };
    passport.authenticate('oauth-bearer', { session: false }, customCallback)(req, res, next);
  };
};

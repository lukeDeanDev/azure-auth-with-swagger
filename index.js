const http = require('http');
const express = require('express');

const swaggerUi = require('swagger-ui-express');
const { tenantId, clientId } = require('./config');
const swaggerDocument = require('./swaggerDoc')({ tenantId, clientId });

const authMiddleware = require('./authMiddleware')({ tenantId, clientId });

const router = express.Router();

router.get('/', (req, res) => {
  res.redirect('/api-docs');
});
router.get('/hello', authMiddleware, (req, res) => {
  res.send(`Hello ${req.userName}, and welcome to authentication with Azure.`);
});

router.use('/api-docs', swaggerUi.serve);
router.get(
  '/api-docs',
  swaggerUi.setup(swaggerDocument, false, {
    oauth2RedirectUrl: 'http://localhost:8080/api-docs/oauth2-redirect.html',
    oauth: {
      clientId,
      scopes: [`${clientId}/.default`],
      usePkceWithAuthorizationCodeGrant: true,
    },
  }),
);

const app = express();
app.use(router);
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (!req.userName) {
    res.sendStatus(401);
    return;
  }
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const server = http.createServer(app);
server.listen(8080, () => {
  console.log('listening');
});

module.exports = { app };

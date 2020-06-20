module.exports = ({ tenantId, clientId }) => ({
  openapi: '3.0.0',
  info: {
    title: 'Azure OAuth2 v2 example',
    version: '1.0.0',
    description:
      'Swagger with Azure OAuth v2 authenticationCode flow example.\n\nHit the **Authorize** button to launch the authorization popup.  Accept the default options by pressing **Authorize** again in the popup.  Authorize with Azure.  Click **Close** after you are authenticated.  You will see the lock icon close now.  Endpoints listed on this page which have a lock icon will submit your bearer token as an Authorization header now.',
  },
  tags: [],
  paths: {
    '/hello': {
      get: {
        summary: 'says hello to an authenticated user',
        security: [{ myAzureOAuth: [`${clientId}/.default`] }],
        responses: { 200: { description: 'OK' } },
      },
    },
  },
  components: {
    securitySchemes: {
      myAzureOAuth: {
        type: 'oauth2',
        flows: {
          authorizationCode: {
            authorizationUrl: `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/authorize`,
            tokenUrl: `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`,
            scopes: {
              [`${clientId}/.default`]: 'default',
            },
          },
        },
      },
    },
  },
});

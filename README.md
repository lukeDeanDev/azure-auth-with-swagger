# azure-auth-with-swagger

Azure OAuth2 authenticationCode flow with v2 tokens through swagger

## Set up Azure

In your Azure Active Directory tenant, create a new "App registration".

Give it a Redirect URI of type SPA (single page application) with value `http://localhost:8080/api-docs/oauth2-redirect.html`

If you choose to create this application registration as "single tenant" (which is fine), then you must edit the application manifest. Single tenant applications return v1 tokens even from v2 endpoints. v1 and v2 tokens have different issuers (the ISS claim). We validate the token's issuer against what's listed in the OIDC metadata document for the tenant, which is the v2 issuer. To force Azure to return v2 tenants...
In the manifest, change this setting from `null` to `2`:
"accessTokenAcceptedVersion": 2

## Building and running

Modify ./config.js with your own tenantId and clientId
The tenantId is sometimes also called the Directory ID. It's a GUID.
The clientId is sometimes also called the Application ID. It's a GUID.
Application ID URIs don't quite work here without some tweaking.

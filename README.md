# azure-auth-with-swagger

Azure OAuth2 authenticationCode flow with v2 tokens through swagger

## Create an Application Registration in Azure Active Directory

In your Azure Active Directory tenant, create a new "App registration". For our purposes, this becomes our OAuth client definition.

Give the App Registration a Redirect URI of type SPA (single page application) with value `http://localhost:8080/api-docs/oauth2-redirect.html` This is where we want Azure's login page to redirect us after we log in. It's part of Swagger UI.

If you choose to create this App Registration as "single tenant" (which is fine), then you must edit the application manifest. Change this setting from `null` to `2`:

```
"accessTokenAcceptedVersion": 2
```

Here's why you have to do this. Currently, Azure OAuth v2 endpoints for single tenant applications still return v1 tokens. v1 and v2 tokens have different issuers (the ISS claim). We validate the token's issuer against the issuer who is listed in the OIDC metadata document for the tenant, which is the v2 issuer. To make everything match up, force Azure to issue v2 tokens by setting the accessTokenAcceptedVersion to 2 in the manifest.

## Building and running

Modify ./config.js with your own tenantId and clientId
The tenantId is sometimes also called the Directory ID. It's a GUID.
The clientId is sometimes also called the Application ID. It's a GUID.
Application ID URIs don't quite work here without some tweaking.

`npm run start` and point your browser at `http://localhost:8080/api-docs` to access the swagger page. Here you can play with authentication and an endpoint that requires authentication.

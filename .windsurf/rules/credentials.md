---
trigger: glob
globs:
  - "credentials/**/*.ts"
  - "**/*.credentials.ts"
description: "n8n credential development rules - auto-applies when editing credential files"
---

# n8n Credential Development Rules

## Reference Files

| Auth Type | File | Doc |
|-----------|------|-----|
| API Key | `credentials/GithubIssuesApi.credentials.ts` | `docs/08-api-key-credentials.md` |
| OAuth2 | `credentials/GithubIssuesOAuth2Api.credentials.ts` | `docs/09-oauth2-credentials.md` |

---

## API Key Credential Pattern

```typescript
import type { 
  ICredentialType, 
  INodeProperties, 
  IAuthenticateGeneric 
} from 'n8n-workflow';

export class MyServiceApi implements ICredentialType {
  name = 'myServiceApi';
  displayName = 'My Service API';
  documentationUrl = 'https://docs.myservice.com/api-keys';
  
  properties: INodeProperties[] = [
    {
      displayName: 'API Key',
      name: 'apiKey',
      type: 'string',
      typeOptions: { password: true },
      default: '',
      required: true,
    },
    {
      displayName: 'Base URL',
      name: 'baseUrl',
      type: 'string',
      default: 'https://api.myservice.com',
      description: 'Override for self-hosted instances',
    },
  ];

  authenticate: IAuthenticateGeneric = {
    type: 'generic',
    properties: {
      headers: {
        Authorization: '=Bearer {{$credentials.apiKey}}',
      },
    },
  };
}
```

---

## OAuth2 Credential Pattern

```typescript
import type { ICredentialType, INodeProperties } from 'n8n-workflow';

export class MyServiceOAuth2Api implements ICredentialType {
  name = 'myServiceOAuth2Api';
  displayName = 'My Service OAuth2 API';
  extends = ['oAuth2Api'];
  documentationUrl = 'https://docs.myservice.com/oauth2';

  properties: INodeProperties[] = [
    {
      displayName: 'Grant Type',
      name: 'grantType',
      type: 'hidden',
      default: 'authorizationCode',
    },
    {
      displayName: 'Authorization URL',
      name: 'authUrl',
      type: 'hidden',
      default: 'https://myservice.com/oauth/authorize',
    },
    {
      displayName: 'Access Token URL',
      name: 'accessTokenUrl',
      type: 'hidden',
      default: 'https://myservice.com/oauth/token',
    },
    {
      displayName: 'Scope',
      name: 'scope',
      type: 'hidden',
      default: 'read write',
    },
    {
      displayName: 'Authentication',
      name: 'authentication',
      type: 'hidden',
      default: 'header',
    },
  ];
}
```

---

## Authentication Methods

| Method | Property | Example |
|--------|----------|---------|
| Bearer Token | `headers.Authorization` | `'=Bearer {{$credentials.apiKey}}'` |
| API Key Header | `headers.X-API-Key` | `'={{$credentials.apiKey}}'` |
| Basic Auth | `headers.Authorization` | `'=Basic {{$credentials.username}}:{{$credentials.password}}'` |
| Query Parameter | `qs.api_key` | `'={{$credentials.apiKey}}'` |

---

## Credential Testing

```typescript
export class MyServiceApi implements ICredentialType {
  // ... properties ...

  test: ICredentialTestRequest = {
    request: {
      baseURL: '={{$credentials.baseUrl}}',
      url: '/me',
    },
  };
}
```

---

## Registration

```json
{
  "n8n": {
    "credentials": [
      "dist/credentials/MyServiceApi.credentials.js"
    ]
  }
}
```

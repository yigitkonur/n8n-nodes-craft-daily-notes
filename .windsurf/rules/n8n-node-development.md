---
trigger: glob
globs:
  - "nodes/**/*.ts"
  - "nodes/**/*.json"
  - "**/*.node.ts"
description: "n8n node development rules - auto-applies when editing node files"
---

# n8n Node Development Rules

## Technology Stack

| Component | Version | Notes |
|-----------|---------|-------|
| Runtime | Node.js v22+ | LTS required |
| Language | TypeScript 5.x | strict mode enabled |
| Framework | n8n Node SDK | INodeType, INodeProperties |
| CLI | @n8n/node-cli | dev, build, lint |

---

## Architecture Decision

```
┌─────────────────────────────────────────────────────────────┐
│ Is it a REST API with standard CRUD operations?             │
│   YES → DECLARATIVE style                                   │
│   └─ Reference: nodes/GithubIssues/GithubIssues.node.ts     │
│   └─ Doc: docs/12-declarative-routing.md                    │
├─────────────────────────────────────────────────────────────┤
│ Does it have an official SDK/client library?                │
│   YES → PROGRAMMATIC style                                  │
│   └─ Reference: nodes/Example/Example.node.ts               │
│   └─ Doc: docs/13-custom-execute-methods.md                 │
├─────────────────────────────────────────────────────────────┤
│ Is it GraphQL, WebSocket, or non-REST?                      │
│   YES → PROGRAMMATIC style                                  │
├─────────────────────────────────────────────────────────────┤
│ Complex authentication (request signing, multi-step)?       │
│   YES → PROGRAMMATIC style                                  │
└─────────────────────────────────────────────────────────────┘
```

---

## File Structure (Declarative Multi-Resource)

```
nodes/MyService/
├── MyService.node.ts              # Main entry with requestDefaults
├── MyService.node.json            # Metadata
├── myservice.svg                  # Icon (SVG)
├── resources/                     # One folder per resource
│   ├── user/
│   │   ├── index.ts              # Resource description + operations
│   │   ├── create.ts             # Create operation fields
│   │   ├── get.ts                # Get operation fields
│   │   ├── getAll.ts             # List with pagination
│   │   ├── update.ts             # Update operation fields
│   │   └── delete.ts             # Delete operation fields
│   └── project/
│       └── [same structure]
├── listSearch/                    # Dynamic dropdown methods
│   ├── getUsers.ts
│   └── getProjects.ts
└── shared/
    ├── descriptions.ts            # Reusable UI (resourceLocator)
    ├── transport.ts               # API request wrapper
    └── utils.ts                   # Helper functions
```

---

## Declarative Routing Pattern

```typescript
// Main node: nodes/MyService/MyService.node.ts
import type { INodeType, INodeTypeDescription } from 'n8n-workflow';
import { userDescription } from './resources/user';

export class MyService implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'My Service',
    name: 'myService',
    icon: 'file:myservice.svg',
    group: ['transform'],
    version: 1,
    subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
    description: 'Interact with My Service API',
    defaults: { name: 'My Service' },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [{ name: 'myServiceApi', required: true }],
    requestDefaults: {
      baseURL: 'https://api.myservice.com/v1',
      headers: { 'Content-Type': 'application/json' },
    },
    properties: [
      {
        displayName: 'Resource',
        name: 'resource',
        type: 'options',
        noDataExpression: true,
        options: [{ name: 'User', value: 'user' }],
        default: 'user',
      },
      ...userDescription,
    ],
  };
}
```

```typescript
// Resource: resources/user/create.ts
import type { INodeProperties } from 'n8n-workflow';

export const userCreateFields: INodeProperties[] = [
  {
    displayName: 'Name',
    name: 'name',
    type: 'string',
    required: true,
    default: '',
    displayOptions: { show: { resource: ['user'], operation: ['create'] } },
    routing: { send: { type: 'body', property: 'name' } },
  },
];
```

---

## Programmatic Execute Pattern

```typescript
async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
  // 1. Get credentials ONCE (before the loop)
  const credentials = await this.getCredentials('myServiceApi');
  const client = new SDK(credentials.apiKey);

  // 2. Process items
  const items = this.getInputData();
  const returnData: INodeExecutionData[] = [];

  for (let i = 0; i < items.length; i++) {
    try {
      const result = await client.operation();
      returnData.push({ json: result, pairedItem: { item: i } });
    } catch (error) {
      if (this.continueOnFail()) {
        returnData.push({ json: { error: error.message }, pairedItem: { item: i } });
        continue;
      }
      throw new NodeOperationError(this.getNode(), error, { itemIndex: i });
    }
  }
  return [returnData];
}
```

---

## Routing Types

| Type | Purpose | Example |
|------|---------|---------|
| `routing.send.type: 'body'` | Request body | `{ send: { type: 'body', property: 'name' } }` |
| `routing.send.type: 'query'` | URL parameter | `{ send: { type: 'query', property: 'limit' } }` |
| `routing.send.type: 'header'` | HTTP header | `{ send: { type: 'header', property: 'X-Custom' } }` |
| `routing.output.maxResults` | Limit results | `{ output: { maxResults: '={{$value}}' } }` |

---

## Common Mistakes

| ❌ DON'T | ✅ DO |
|----------|-------|
| Init SDK per item | Init SDK ONCE before loop |
| Forget pairedItem | Always include `pairedItem: { item: i }` |
| Hardcode credentials | Use `this.getCredentials()` |
| Skip error handling | Use `this.continueOnFail()` |
| Use `any` types | Define TypeScript interfaces |

---

## Commands

```bash
pnpm dev      # Development with hot reload
pnpm build    # Compile TypeScript
pnpm lint:fix # Auto-fix lint issues
```

---

## Package.json Registration

```json
{
  "n8n": {
    "nodes": ["dist/nodes/MyService/MyService.node.js"],
    "credentials": ["dist/credentials/MyServiceApi.credentials.js"]
  }
}
```

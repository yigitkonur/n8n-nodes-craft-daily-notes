---
trigger: glob
globs:
  - "docs/**/*.md"
description: "n8n documentation navigator - helps find the right guide"
---

# n8n Documentation Navigator

## Complete Documentation Tree (31 Files)

```
docs/
├── 00-documentation-index.md          # Master index
├── 01-project-structure-overview.md   # Repository layout
├── 02-package-json-configuration.md   # npm setup
├── 03-typescript-configuration.md     # TypeScript config
├── 04-node-anatomy-and-architecture.md # Node structure
├── 05-declarative-vs-programmatic-nodes.md # Architecture choice
├── 06-node-properties-reference.md    # Property types
├── 07-credentials-system-overview.md  # Auth architecture
├── 08-api-key-credentials.md          # API key auth
├── 09-oauth2-credentials.md           # OAuth2 auth
├── 10-creating-your-first-node.md     # Tutorial
├── 11-resources-and-operations.md     # Multi-resource
├── 12-declarative-routing.md          # routing.send
├── 13-custom-execute-methods.md       # execute()
├── 14-list-search-methods.md          # Dynamic dropdowns
├── 15-resource-locators.md            # Multi-mode inputs
├── 16-pagination-handling.md          # Pagination
├── 17-error-handling-patterns.md      # Error handling
├── 18-helper-functions-and-utilities.md # Utilities
├── 19-external-sdk-integration.md     # SDK patterns
├── 20-icons-and-branding.md           # Icons
├── 21-node-json-metadata.md           # node.json
├── 22-development-workflow.md         # Dev workflow
├── 23-testing-strategies.md           # Testing
├── 24-linting-and-code-quality.md     # ESLint
├── 25-preparing-for-publication.md    # Pre-publish
├── 26-publishing-to-npm.md            # npm publish
├── 27-n8n-cloud-verification.md       # Cloud verification
├── 28-complete-code-examples.md       # Examples
├── 29-common-patterns-and-recipes.md  # Recipes
└── 30-troubleshooting-guide.md        # Troubleshooting
```

---

## Quick Reference by Task

| I want to... | Primary Doc | Also Read |
|--------------|-------------|-----------|
| Start a new node | `docs/10-creating-your-first-node.md` | `docs/00-documentation-index.md` |
| Choose architecture | `docs/05-declarative-vs-programmatic-nodes.md` | `docs/04-node-anatomy-and-architecture.md` |
| Build REST API node | `docs/12-declarative-routing.md` | `docs/06-node-properties-reference.md` |
| Integrate an SDK | `docs/13-custom-execute-methods.md` | `docs/19-external-sdk-integration.md` |
| Add API key auth | `docs/08-api-key-credentials.md` | `docs/07-credentials-system-overview.md` |
| Add OAuth2 auth | `docs/09-oauth2-credentials.md` | `docs/07-credentials-system-overview.md` |
| Organize multi-resource | `docs/11-resources-and-operations.md` | `docs/04-node-anatomy-and-architecture.md` |
| Add dynamic dropdowns | `docs/14-list-search-methods.md` | `docs/15-resource-locators.md` |
| Handle pagination | `docs/16-pagination-handling.md` | `docs/12-declarative-routing.md` |
| Handle errors | `docs/17-error-handling-patterns.md` | `docs/30-troubleshooting-guide.md` |
| Create icons | `docs/20-icons-and-branding.md` | `docs/21-node-json-metadata.md` |
| Write tests | `docs/23-testing-strategies.md` | `docs/22-development-workflow.md` |
| Publish to npm | `docs/25-preparing-for-publication.md` | `docs/26-publishing-to-npm.md` |
| Submit to n8n Cloud | `docs/27-n8n-cloud-verification.md` | `docs/25-preparing-for-publication.md` |
| Debug issues | `docs/30-troubleshooting-guide.md` | `docs/17-error-handling-patterns.md` |

---

## Documentation by Category

### Setup & Configuration
- `docs/01-project-structure-overview.md`
- `docs/02-package-json-configuration.md`
- `docs/03-typescript-configuration.md`

### Node Architecture
- `docs/04-node-anatomy-and-architecture.md`
- `docs/05-declarative-vs-programmatic-nodes.md`
- `docs/06-node-properties-reference.md`

### Authentication
- `docs/07-credentials-system-overview.md`
- `docs/08-api-key-credentials.md`
- `docs/09-oauth2-credentials.md`

### Building Nodes
- `docs/10-creating-your-first-node.md`
- `docs/11-resources-and-operations.md`
- `docs/12-declarative-routing.md`
- `docs/13-custom-execute-methods.md`

### Dynamic UI
- `docs/14-list-search-methods.md`
- `docs/15-resource-locators.md`

### Data Handling
- `docs/16-pagination-handling.md`
- `docs/17-error-handling-patterns.md`
- `docs/18-helper-functions-and-utilities.md`
- `docs/19-external-sdk-integration.md`

### Branding
- `docs/20-icons-and-branding.md`
- `docs/21-node-json-metadata.md`

### Development
- `docs/22-development-workflow.md`
- `docs/23-testing-strategies.md`
- `docs/24-linting-and-code-quality.md`

### Publishing
- `docs/25-preparing-for-publication.md`
- `docs/26-publishing-to-npm.md`
- `docs/27-n8n-cloud-verification.md`

### Reference
- `docs/28-complete-code-examples.md`
- `docs/29-common-patterns-and-recipes.md`
- `docs/30-troubleshooting-guide.md`

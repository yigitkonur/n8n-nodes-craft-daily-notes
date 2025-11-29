# n8n Custom Node Starter

> Build n8n community nodes with your favorite AI coding assistant. Pre-configured rules for 11 tools — pick one, remove the rest.

[![n8n](https://img.shields.io/badge/n8n-Community%20Node-FF6D5A?style=flat-square&logo=n8n&logoColor=white)](https://docs.n8n.io/integrations/creating-nodes/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-22+-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE.md)
[![Docs](https://img.shields.io/badge/Docs-31%20Files-blue?style=flat-square)](docs/)

---

## Supported AI Assistants

[![Cursor](https://img.shields.io/badge/Cursor-00D9FF?style=flat-square&logo=cursor&logoColor=white)](#cursor)
[![Windsurf](https://img.shields.io/badge/Windsurf-3B82F6?style=flat-square)](#windsurf)
[![Claude Code](https://img.shields.io/badge/Claude%20Code-9333EA?style=flat-square&logo=anthropic&logoColor=white)](#claude-code)
[![GitHub Copilot](https://img.shields.io/badge/GitHub%20Copilot-181717?style=flat-square&logo=github&logoColor=white)](#github-copilot)
[![Cline](https://img.shields.io/badge/Cline-FF6B6B?style=flat-square)](#cline)
[![Roo-Cline](https://img.shields.io/badge/Roo--Cline-F97316?style=flat-square)](#roo-cline)
[![Continue.dev](https://img.shields.io/badge/Continue.dev-0EA5E9?style=flat-square)](#continuedev)
[![Aider](https://img.shields.io/badge/Aider-2563EB?style=flat-square)](#aider)
[![Zed](https://img.shields.io/badge/Zed-084CCF?style=flat-square&logo=zed&logoColor=white)](#zed)
[![JetBrains AI](https://img.shields.io/badge/JetBrains%20AI-000000?style=flat-square&logo=jetbrains&logoColor=white)](#jetbrains-ai)
[![Gemini CLI](https://img.shields.io/badge/Gemini%20CLI-4285F4?style=flat-square&logo=google&logoColor=white)](#gemini-cli)

---

## Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/your-username/n8n-nodes-starter.git
cd n8n-nodes-starter
npm install
```

### 2. Choose Your AI Tool

Pick **one** AI assistant and remove the configuration files for all others to avoid conflicts:

| I use... | Run this to clean up |
|----------|---------------------|
| **Cursor** | `rm -rf CLAUDE.md .clinerules .roomodes .rules .aider.conf.yml .continue .github/copilot-instructions.md .aiassistant .gemini .windsurf` |
| **Windsurf** | `rm -rf CLAUDE.md .clinerules .roomodes .rules .aider.conf.yml .continue .github/copilot-instructions.md .aiassistant .gemini .cursor` |
| **Claude Code** | `rm -rf .cursor .windsurf .clinerules .roomodes .rules .aider.conf.yml .continue .github/copilot-instructions.md .aiassistant .gemini` |
| **GitHub Copilot** | `rm -rf CLAUDE.md .cursor .windsurf .clinerules .roomodes .rules .aider.conf.yml .continue .aiassistant .gemini` |
| **Cline** | `rm -rf CLAUDE.md .cursor .windsurf .roomodes .rules .aider.conf.yml .continue .github/copilot-instructions.md .aiassistant .gemini` |
| **Roo-Cline** | `rm -rf CLAUDE.md .cursor .windsurf .clinerules .rules .aider.conf.yml .continue .github/copilot-instructions.md .aiassistant .gemini` |
| **Continue.dev** | `rm -rf CLAUDE.md .cursor .windsurf .clinerules .roomodes .rules .aider.conf.yml .github/copilot-instructions.md .aiassistant .gemini` |
| **Aider** | `rm -rf CLAUDE.md .cursor .windsurf .clinerules .roomodes .rules .continue .github/copilot-instructions.md .aiassistant .gemini` |
| **Zed** | `rm -rf CLAUDE.md .cursor .windsurf .clinerules .roomodes .aider.conf.yml .continue .github/copilot-instructions.md .aiassistant .gemini` |
| **JetBrains AI** | `rm -rf CLAUDE.md .cursor .windsurf .clinerules .roomodes .rules .aider.conf.yml .continue .github/copilot-instructions.md .gemini` |
| **Gemini CLI** | `rm -rf CLAUDE.md .cursor .windsurf .clinerules .roomodes .rules .aider.conf.yml .continue .github/copilot-instructions.md .aiassistant` |

> **Note**: Keep `AGENTS.md` — it's the single source of truth referenced by multiple tools.

### 3. Start Development

```bash
npm run dev  # Opens n8n at http://localhost:5678
```

### 4. Ask Your AI

> "Create a new n8n node for the Stripe API with API key authentication and CRUD operations for customers"

---

## Tool Configuration Reference

Each AI assistant requires a specific configuration format. Here's why we created each file and how it's customized for n8n node development.

---

### Cursor

[![Cursor](https://img.shields.io/badge/Cursor-00D9FF?style=for-the-badge&logo=cursor&logoColor=white)](https://cursor.com)

**Config Files:**
```
.cursor/rules/
├── n8n-node-development.mdc   # Main rules (344 lines)
├── credentials.mdc            # Credential-specific rules
└── documentation.mdc          # Doc navigation helper
```

**Why these files:** Cursor uses MDC format (Markdown + YAML frontmatter) with glob patterns to auto-attach rules when editing specific file types. We created three focused rule files that activate based on what you're editing — node files, credentials, or documentation.

**Customizations:**
- `globs: ["nodes/**/*.ts", "credentials/**/*.ts"]` — Auto-applies to n8n source files
- `alwaysApply: false` — Only loads when relevant files are open
- Excludes `node_modules/**` and `dist/**`

**If using Cursor, remove others:**
```bash
rm -rf CLAUDE.md .clinerules .roomodes .rules .aider.conf.yml .continue .github/copilot-instructions.md .aiassistant .gemini .windsurf
```

---

### Windsurf

[![Windsurf](https://img.shields.io/badge/Windsurf-3B82F6?style=for-the-badge)](https://codeium.com/windsurf)

**Config Files:**
```
.windsurf/rules/
├── n8n-node-development.md    # Main rules (180 lines)
├── credentials.md             # Credential-specific rules
└── documentation.md           # Doc navigation helper
```

**Why these files:** Windsurf supports glob-triggered rules that auto-apply based on file patterns. We created three focused rule files — one for node development, one for credentials, and one for documentation navigation — each activating only when relevant files are open.

**Customizations:**
- `trigger: glob` with `globs: ["nodes/**/*.ts"]` — Auto-applies to n8n source files
- Separate credential rules for `credentials/**/*.ts`
- Doc navigation for `docs/**/*.md`

**If using Windsurf, remove others:**
```bash
rm -rf CLAUDE.md .clinerules .roomodes .rules .aider.conf.yml .continue .github/copilot-instructions.md .aiassistant .gemini .cursor
```

---

### Claude Code

[![Claude Code](https://img.shields.io/badge/Claude%20Code-9333EA?style=for-the-badge&logo=anthropic&logoColor=white)](https://claude.ai/code)

**Config Files:**
```
CLAUDE.md                      # Project rules (165 lines)
AGENTS.md                      # Detailed reference (445 lines)
```

**Why these files:** Claude Code reads `CLAUDE.md` from the project root as its primary instruction file. It's designed for natural language context with code examples. We also include `AGENTS.md` as a comprehensive reference that Claude can access via file reading.

**Customizations:**
- Key commands section for quick reference
- Decision tree in prose format
- Pattern examples with inline comments
- References to all 31 documentation files

**If using Claude Code, remove others:**
```bash
rm -rf .cursor .windsurf .clinerules .roomodes .rules .aider.conf.yml .continue .github/copilot-instructions.md .aiassistant .gemini
```

---

### GitHub Copilot

[![GitHub Copilot](https://img.shields.io/badge/GitHub%20Copilot-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/features/copilot)

**Config Files:**
```
.github/
└── copilot-instructions.md    # Repository instructions (227 lines)
```

**Why this file:** GitHub Copilot reads `.github/copilot-instructions.md` for repository-level context. This file provides the AI with project-specific patterns that apply to all Copilot suggestions within the repo.

**Customizations:**
- Technology stack table
- ASCII decision tree for quick parsing
- Routing types reference table
- Complete 31-file documentation index

**If using GitHub Copilot, remove others:**
```bash
rm -rf CLAUDE.md .cursor .windsurf .clinerules .roomodes .rules .aider.conf.yml .continue .aiassistant .gemini
```

---

### Cline

[![Cline](https://img.shields.io/badge/Cline-FF6B6B?style=for-the-badge)](https://github.com/cline/cline)

**Config Files:**
```
.clinerules                    # Project rules (126 lines)
```

**Why this file:** Cline (VS Code extension) reads `.clinerules` for project-specific instructions. It's a simple markdown format focused on concise rules that Cline applies during autonomous coding sessions.

**Customizations:**
- Architecture decision matrix
- File structure with annotations
- SDK execution pattern template
- Common mistakes as bullet points

**If using Cline, remove others:**
```bash
rm -rf CLAUDE.md .cursor .windsurf .roomodes .rules .aider.conf.yml .continue .github/copilot-instructions.md .aiassistant .gemini
```

---

### Roo-Cline

[![Roo-Cline](https://img.shields.io/badge/Roo--Cline-F97316?style=for-the-badge)](https://github.com/RooVetGit/Roo-Cline)

**Config Files:**
```
.roomodes                      # Custom modes (264 lines, YAML)
```

**Why this file:** Roo-Cline supports custom "modes" that define different AI personas with specific file access permissions. We created three specialized modes for different development tasks.

**Customizations:**
- **n8n-node-developer** — Full access to nodes/ and credentials/
- **n8n-credential-developer** — Focused on credentials/ only
- **n8n-docs-navigator** — Read-only mode for documentation help
- `fileRegex` patterns restrict edits to relevant files

**If using Roo-Cline, remove others:**
```bash
rm -rf CLAUDE.md .cursor .windsurf .clinerules .rules .aider.conf.yml .continue .github/copilot-instructions.md .aiassistant .gemini
```

---

### Continue.dev

[![Continue.dev](https://img.shields.io/badge/Continue.dev-0EA5E9?style=for-the-badge)](https://continue.dev)

**Config Files:**
```
.continue/rules/
└── n8n-rules.md               # Project rules (144 lines)
```

**Why this file:** Continue.dev uses a `rules/` directory for project-specific markdown instructions. It supports `@file` references to include other files in context.

**Customizations:**
- Uses `@nodes/GithubIssues/` syntax for file references
- Table-based common mistakes guide
- Integration with Continue's context system

**If using Continue.dev, remove others:**
```bash
rm -rf CLAUDE.md .cursor .windsurf .clinerules .roomodes .rules .aider.conf.yml .github/copilot-instructions.md .aiassistant .gemini
```

---

### Aider

[![Aider](https://img.shields.io/badge/Aider-2563EB?style=for-the-badge)](https://aider.chat)

**Config Files:**
```
.aider.conf.yml                # Aider configuration (33 lines)
AGENTS.md                      # Read by Aider automatically
```

**Why these files:** Aider uses `.aider.conf.yml` for project configuration and automatically reads files listed in the `read:` section. We configured it to load the main rules and key documentation files.

**Customizations:**
- `read:` section loads AGENTS.md and key docs
- `lint-cmd: npm run lint` — Auto-lint after changes
- `auto-lint: true` — Automatically run linter
- `watch-files:` monitors node and credential files

**If using Aider, remove others:**
```bash
rm -rf CLAUDE.md .cursor .windsurf .clinerules .roomodes .rules .continue .github/copilot-instructions.md .aiassistant .gemini
```

---

### Zed

[![Zed](https://img.shields.io/badge/Zed-084CCF?style=for-the-badge&logo=zed&logoColor=white)](https://zed.dev)

**Config Files:**
```
.rules                         # Zed rules (58 lines)
```

**Why this file:** Zed reads `.rules` from the project root for AI assistant context. It's a compact markdown format designed for quick parsing.

**Customizations:**
- Ultra-compact format (58 lines)
- Essential commands and patterns only
- Reference file paths for deeper context

**If using Zed, remove others:**
```bash
rm -rf CLAUDE.md .cursor .windsurf .clinerules .roomodes .aider.conf.yml .continue .github/copilot-instructions.md .aiassistant .gemini
```

---

### JetBrains AI

[![JetBrains AI](https://img.shields.io/badge/JetBrains%20AI-000000?style=for-the-badge&logo=jetbrains&logoColor=white)](https://www.jetbrains.com/ai/)

**Config Files:**
```
.aiassistant/rules/
└── n8n-rules.md               # AI Assistant rules (151 lines)
```

**Why this file:** JetBrains AI Assistant reads from `.aiassistant/rules/` directory for project-specific instructions in IntelliJ, WebStorm, and other JetBrains IDEs.

**Customizations:**
- Table-formatted technology stack
- Decision tree with clear branching
- Complete pattern examples
- IDE-friendly markdown structure

**If using JetBrains AI, remove others:**
```bash
rm -rf CLAUDE.md .cursor .windsurf .clinerules .roomodes .rules .aider.conf.yml .continue .github/copilot-instructions.md .gemini
```

---

### Gemini CLI

[![Gemini CLI](https://img.shields.io/badge/Gemini%20CLI-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)

**Config Files:**
```
.gemini/
└── settings.json              # Gemini configuration (JSON)
```

**Why this file:** Gemini CLI uses JSON configuration for project context. We define key references and code style preferences that Gemini uses when generating code.

**Customizations:**
- `projectContext` with description and rules reference
- `codeStyle` preferences for TypeScript strict mode
- `keyReferences` pointing to example files

**If using Gemini CLI, remove others:**
```bash
rm -rf CLAUDE.md .cursor .windsurf .clinerules .roomodes .rules .aider.conf.yml .continue .github/copilot-instructions.md .aiassistant
```

---

## Project Structure

```
├── .cursor/rules/              # Cursor (MDC format, glob patterns)
│   ├── n8n-node-development.mdc
│   ├── credentials.mdc
│   └── documentation.mdc
├── .windsurf/rules/            # Windsurf (glob triggers)
│   ├── n8n-node-development.md
│   ├── credentials.md
│   └── documentation.md
├── .continue/rules/            # Continue.dev (@ file refs)
│   └── n8n-rules.md
├── .github/                    # GitHub Copilot
│   └── copilot-instructions.md
├── .aiassistant/rules/         # JetBrains AI
│   └── n8n-rules.md
├── .gemini/                    # Gemini CLI
│   └── settings.json
├── AGENTS.md                   # Single source of truth
├── CLAUDE.md                   # Claude Code
├── .clinerules                 # Cline
├── .roomodes                   # Roo-Cline (3 modes)
├── .rules                      # Zed
├── .aider.conf.yml             # Aider
├── credentials/                # Auth implementations
│   ├── GithubIssuesApi.credentials.ts
│   └── GithubIssuesOAuth2Api.credentials.ts
├── nodes/                      # Node implementations
│   ├── Example/                # Programmatic pattern
│   └── GithubIssues/           # Declarative pattern
│       ├── resources/          # Per-resource operations
│       ├── listSearch/         # Dynamic dropdowns
│       └── shared/             # Reusable utilities
└── docs/                       # 31 documentation files
```

---

## Documentation (31 Files)

All AI configurations reference these documentation files:

| # | File | Purpose |
|---|------|---------|
| 00 | `documentation-index.md` | Master index |
| 01 | `project-structure-overview.md` | Repository layout |
| 02 | `package-json-configuration.md` | npm setup |
| 03 | `typescript-configuration.md` | tsconfig.json |
| 04 | `node-anatomy-and-architecture.md` | Node structure |
| 05 | `declarative-vs-programmatic-nodes.md` | Architecture choice |
| 06 | `node-properties-reference.md` | Property types |
| 07 | `credentials-system-overview.md` | Auth overview |
| 08 | `api-key-credentials.md` | API key auth |
| 09 | `oauth2-credentials.md` | OAuth2 auth |
| 10 | `creating-your-first-node.md` | Tutorial |
| 11 | `resources-and-operations.md` | Multi-resource |
| 12 | `declarative-routing.md` | routing.send |
| 13 | `custom-execute-methods.md` | execute() |
| 14 | `list-search-methods.md` | Dropdowns |
| 15 | `resource-locators.md` | Multi-mode inputs |
| 16 | `pagination-handling.md` | Pagination |
| 17 | `error-handling-patterns.md` | Errors |
| 18 | `helper-functions-and-utilities.md` | Utilities |
| 19 | `external-sdk-integration.md` | SDK patterns |
| 20 | `icons-and-branding.md` | SVG icons |
| 21 | `node-json-metadata.md` | node.json |
| 22 | `development-workflow.md` | Dev workflow |
| 23 | `testing-strategies.md` | Testing |
| 24 | `linting-and-code-quality.md` | ESLint |
| 25 | `preparing-for-publication.md` | Pre-publish |
| 26 | `publishing-to-npm.md` | npm publish |
| 27 | `n8n-cloud-verification.md` | Cloud verification |
| 28 | `complete-code-examples.md` | Examples |
| 29 | `common-patterns-and-recipes.md` | Recipes |
| 30 | `troubleshooting-guide.md` | Troubleshooting |

---

## Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies |
| `npm run dev` | Start n8n with hot reload |
| `npm run build` | Compile TypeScript |
| `npm run lint` | Check code quality |
| `npm run lint:fix` | Auto-fix lint issues |
| `npm run release` | Create new release |

---

## License

MIT License — see [LICENSE.md](LICENSE.md)

---

## Resources

- [n8n Creating Nodes](https://docs.n8n.io/integrations/creating-nodes/)
- [n8n Community Forum](https://community.n8n.io/)
- [n8n Creator Portal](https://creators.n8n.io/nodes)


# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.1] - 2025-11-29

### Fixed

- Minor code quality improvements for n8n community standards compliance
- Improved field ordering in Task Add operation for better UX

## [1.0.0] - 2025-11-29

### Added

- **Block Resource**: Get, Insert, Update, Delete, Move, Search in Document operations
- **Task Resource**: Get, Add, Update, Delete operations  
- **Collection Resource**: List, Get Schema, Get Items, Add Items, Update Items, Delete Items operations
- **Search Resource**: Search Across Daily Notes with relevance ranking
- **Smart Block Builder**: Automatically splits large markdown content into optimal blocks using preSend hooks
- **Dynamic Collection Dropdown**: Searchable dropdown for collection selection via loadOptions
- **Relative Date Support**: Use `today`, `tomorrow`, `yesterday`, or ISO format throughout
- **AI Tool Support**: Node can be used as an AI agent tool (`usableAsTool: true`)

### Technical

- Fully declarative node architecture with preSend hooks for complex operations
- TypeScript with strict mode enabled
- Full n8n community node standards compliance
- MIT licensed for n8n Cloud compatibility

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Automated release workflow with GitHub Actions
- Proper changelog generation
- Release script for easy version management

## [1.1.2] - 2025-09-25

### Fixed
- Fixed npm package page not showing README by restoring homepage field to GitHub repo URL
- Added demo field to showcase GitHub Pages demo
- Added prominent live demo link in README

### Added
- publishConfig field to help GitHub detect npm package

## [1.1.1] - 2025-09-25

### Fixed
- Fixed test failures by updating CSS color expectations from "red" to "rgb(255, 0, 0)"
- Fixed Biome configuration to prevent automatic removal of React imports during commits

### Added
- Node.js 24.8.0 compatibility

## [1.1.0] - 2025-09-25

### Added
- Bundle size optimization by removing react-syntax-highlighter dependency
- Simple styled code blocks replacing syntax highlighting
- Manual chunk splitting for better caching (React and markdown dependencies)

### Changed
- Reduced bundle size from 959KB to 321KB (67% reduction)
- Improved build time from 1.06s to 0.51s
- Removed 472 language chunks for cleaner output

## [1.0.2] - 2025-09-25

### Changed
- Migrate tooling to Vite 7 + Vitest 3; tests use `jsdom` environment
- Replace ESLint with Biome; add `format`/`format:fix` scripts
- Add Husky + lint-staged pre-commit hook to run Biome on staged files
- Improve library build with tsup (dual ESM/CJS + d.ts + sourcemaps)
- Add modern `exports` map and `sideEffects: false` for better tree-shaking
- Update `engines.node` to `>=20.19.0` per Vite 7 requirements
- Vite example: fix alias resolution; use module script in `example/index.html`
- Refresh README and metadata (description, repository, badges/links)
- Update LICENSE owner to Hardik Khandelwal

### Fixed
- Clean npm tarball contents (only dist + metadata)

## [1.0.1] - 2025-09-25

### Added
- Initial release of MarkdownTypewriter React component
- Render markdown with typewriter effect
- TypeScript support with type declarations
- Dual ESM and CommonJS outputs
- Basic example app and documentation

[Unreleased]: https://github.com/Hardik500/markdown-typewriter-react/compare/v1.1.2...HEAD
[1.1.2]: https://github.com/Hardik500/markdown-typewriter-react/compare/v1.1.1...v1.1.2
[1.1.1]: https://github.com/Hardik500/markdown-typewriter-react/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/Hardik500/markdown-typewriter-react/compare/v1.0.2...v1.1.0
[1.0.2]: https://github.com/Hardik500/markdown-typewriter-react/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/Hardik500/markdown-typewriter-react/releases/tag/v1.0.1

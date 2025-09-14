# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Initial release of MarkdownTypewriter React component
- Render markdown with typewriter effect
- TypeScript support with type declarations
- Dual ESM and CommonJS outputs
- Basic example app and documentation

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

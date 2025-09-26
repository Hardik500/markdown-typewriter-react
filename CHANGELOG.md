## [Unreleased]

## [1.2.1] - 2025-09-26

### Changed
- Version bump to 1.2.1


## [1.2.0] - 2025-09-25

### Changed
- Version bump to 1.2.0


## [1.1.5] - 2025-09-25

### Changed
- Version bump to 1.1.5


## [1.1.5] - 2025-09-25

### Changed
- Version bump to 1.1.5


### Added
- Comprehensive test coverage improvements (increased from 78% to 95.31%)
- 21 comprehensive tests covering all major functionality
- Tests for timer management, animation completion, and prop changes
- Tests for CSS injection, empty markdown, and error conditions
- Professional demo landing page design improvements
- Better content organization and user flow in demo
- Enhanced header design with dual navigation links

### Fixed
- Removed unused currentCode variable in demo
- Improved test reliability with proper async handling and timer mocking
- Clean up excessive emoji usage in README and demo for professional appearance

### Changed
- Restructured demo page layout for better readability
- Consolidated duplicate sections in demo (merged "Generated Code" and "Basic Usage")
- Improved demo descriptions and navigation
- Enhanced visual hierarchy and professional polish

## [1.1.4] - 2025-09-25

### Added
- Professional README cleanup with reduced emoji usage
- Better content organization and visual hierarchy
- Improved documentation structure and readability

### Fixed
- GitHub Actions workflow pnpm version conflict
- Removed explicit pnpm version to use packageManager field from package.json

## [1.1.3] - 2025-09-25

### Changed
- Version management and release workflow improvements
- Updated build assets and script references

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

[Unreleased]: https://github.com/Hardik500/markdown-typewriter-react/compare/v1.1.4...HEAD
[1.1.4]: https://github.com/Hardik500/markdown-typewriter-react/compare/v1.1.3...v1.1.4
[1.1.3]: https://github.com/Hardik500/markdown-typewriter-react/compare/v1.1.2...v1.1.3
[1.1.2]: https://github.com/Hardik500/markdown-typewriter-react/compare/v1.1.1...v1.1.2
[1.1.1]: https://github.com/Hardik500/markdown-typewriter-react/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/Hardik500/markdown-typewriter-react/compare/v1.0.2...v1.1.0
[1.0.2]: https://github.com/Hardik500/markdown-typewriter-react/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/Hardik500/markdown-typewriter-react/releases/tag/v1.0.1

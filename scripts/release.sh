#!/bin/bash

# Release script for markdown-typewriter-react
# Usage: ./scripts/release.sh [patch|minor|major]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're on main branch
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
    print_error "You must be on the main branch to create a release"
    exit 1
fi

# Check if working directory is clean
if [ -n "$(git status --porcelain)" ]; then
    print_error "Working directory is not clean. Please commit or stash your changes."
    exit 1
fi

# Get release type
RELEASE_TYPE=${1:-patch}
if [[ ! "$RELEASE_TYPE" =~ ^(patch|minor|major)$ ]]; then
    print_error "Invalid release type. Use: patch, minor, or major"
    exit 1
fi

print_status "Creating $RELEASE_TYPE release..."

# Get current version
CURRENT_VERSION=$(node -p "require('./package.json').version")
print_status "Current version: $CURRENT_VERSION"

# Update version
print_status "Updating version..."
pnpm version $RELEASE_TYPE --no-git-tag-version

# Get new version
NEW_VERSION=$(node -p "require('./package.json').version")
print_success "New version: $NEW_VERSION"

# Run tests
print_status "Running tests..."
pnpm run test

# Build package
print_status "Building package..."
pnpm run build

# Build demo
print_status "Building demo..."
pnpm run demo:build

# Commit version bump
print_status "Committing version bump..."
git add package.json
git commit -m "chore: bump version to $NEW_VERSION"

# Create and push tag
TAG_NAME="v$NEW_VERSION"
print_status "Creating tag: $TAG_NAME"
git tag -a "$TAG_NAME" -m "Release $TAG_NAME"

print_status "Pushing changes and tag..."
git push origin main
git push origin "$TAG_NAME"

print_success "Release $TAG_NAME created successfully!"
print_status "GitHub Actions will now:"
print_status "  1. Run tests and build"
print_status "  2. Publish to npm"
print_status "  3. Create GitHub release with changelog"
print_status "  4. Deploy demo to GitHub Pages"
print_status ""
print_status "Check the Actions tab: https://github.com/Hardik500/markdown-typewriter-react/actions"

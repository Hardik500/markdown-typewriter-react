#!/bin/bash

# Update changelog script for markdown-typewriter-react
# Usage: ./scripts/update-changelog.sh

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

print_status "Updating CHANGELOG.md with recent commits..."

# Get the last version from changelog
LAST_VERSION=$(grep -E "^## \[[0-9]" CHANGELOG.md | head -1 | sed 's/## \[\(.*\)\].*/\1/')
print_status "Last version in changelog: $LAST_VERSION"

# Get commits since last version tag
if git rev-parse "v$LAST_VERSION" >/dev/null 2>&1; then
    print_status "Getting commits since v$LAST_VERSION..."
    COMMITS=$(git log --pretty=format:"- %s" "v$LAST_VERSION"..HEAD --reverse)
else
    print_warning "Tag v$LAST_VERSION not found, getting recent commits..."
    COMMITS=$(git log --pretty=format:"- %s" -10 --reverse)
fi

if [ -z "$COMMITS" ]; then
    print_warning "No new commits found since last version"
    exit 0
fi

print_status "Found commits to add:"
echo "$COMMITS"

# Create temporary file with updated changelog
TEMP_CHANGELOG=$(mktemp)

# Write header
cat > "$TEMP_CHANGELOG" << 'EOF'
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed
EOF

# Add the commits
echo "$COMMITS" >> "$TEMP_CHANGELOG"

# Add blank line
echo "" >> "$TEMP_CHANGELOG"

# Append existing changelog content (skip header and first unreleased section)
sed -n '/^## \[.*\]/,$p' CHANGELOG.md >> "$TEMP_CHANGELOG"

# Replace the changelog
mv "$TEMP_CHANGELOG" CHANGELOG.md

print_success "CHANGELOG.md updated successfully!"
print_status "Please review and edit the changelog to categorize changes properly:"
print_status "  - Added: for new features"
print_status "  - Changed: for changes in existing functionality"
print_status "  - Deprecated: for soon-to-be removed features"
print_status "  - Removed: for now removed features"
print_status "  - Fixed: for any bug fixes"
print_status "  - Security: in case of vulnerabilities"

#!/bin/bash

# CI/CD Setup Helper Script for Octograph
set -e

echo "🚀 Octograph CI/CD Setup Helper"
echo "================================"

# Check if we're in the right directory
if [ ! -f "package.json" ] || [ ! -d ".github/workflows" ]; then
    echo "❌ Error: Please run this script from the octograph root directory"
    exit 1
fi

echo "✅ Found octograph project"

# Check for required tools
echo "🔍 Checking required tools..."

if ! command -v pnpm &> /dev/null; then
    echo "❌ pnpm not found. Please install pnpm first:"
    echo "   npm install -g pnpm"
    exit 1
fi

if ! command -v git &> /dev/null; then
    echo "❌ git not found. Please install git first."
    exit 1
fi

echo "✅ Required tools found"

# Check if GitHub CLI is available for easier setup
if command -v gh &> /dev/null; then
    echo "✅ GitHub CLI found - can help with secrets setup"
    GH_CLI_AVAILABLE=true
else
    echo "ℹ️  GitHub CLI not found - you'll need to set up secrets manually"
    GH_CLI_AVAILABLE=false
fi

# Initialize changesets if not already done
if [ ! -f ".changeset/config.json" ]; then
    echo "📦 Initializing changesets..."
    pnpm changeset init
else
    echo "✅ Changesets already configured"
fi

# Check package.json for required scripts
echo "🔍 Checking package.json scripts..."

if ! grep -q '"release"' package.json; then
    echo "⚠️  Warning: 'release' script not found in package.json"
    echo "   This is required for the release workflow"
fi

if ! grep -q '"changeset"' package.json; then
    echo "⚠️  Warning: 'changeset' script not found in package.json"
    echo "   This is required for version management"
fi

# Validate workflow files
echo "🔍 Validating workflow files..."

WORKFLOWS_VALID=true

for workflow in ci.yml deploy.yml release.yml dependencies.yml; do
    if [ ! -f ".github/workflows/$workflow" ]; then
        echo "❌ Missing workflow: $workflow"
        WORKFLOWS_VALID=false
    else
        echo "✅ Found workflow: $workflow"
    fi
done

if [ "$WORKFLOWS_VALID" = false ]; then
    echo "❌ Some workflow files are missing"
    exit 1
fi

echo ""
echo "🎉 CI/CD Setup Complete!"
echo ""
echo "📋 Next Steps:"
echo "1. Set up GitHub secrets (see .github/CI_CD_SETUP.md)"
echo "2. Create Vercel projects for docs and example apps"
echo "3. Configure NPM publishing token"
echo "4. Enable branch protection rules (recommended)"
echo ""

if [ "$GH_CLI_AVAILABLE" = true ]; then
    echo "💡 Quick setup with GitHub CLI:"
    echo "   gh secret set NPM_TOKEN"
    echo "   gh secret set VERCEL_TOKEN"
    echo "   gh secret set VERCEL_ORG_ID"
    echo "   gh secret set VERCEL_DOCS_PROJECT_ID"
    echo "   gh secret set VERCEL_EXAMPLE_PROJECT_ID"
    echo ""
fi

echo "📖 For detailed instructions, see: .github/CI_CD_SETUP.md"
echo ""
echo "✨ Happy coding!"

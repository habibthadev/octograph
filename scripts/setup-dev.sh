#!/bin/bash

# Octograph Development Setup Script
set -e

echo "🎯 Octograph Development Setup"
echo "=============================="

# Check if we're in the right directory
if [ ! -f "package.json" ] || [ ! -d "packages/octograph" ]; then
    echo "❌ Error: Please run this script from the octograph root directory"
    exit 1
fi

echo "✅ Found octograph project"

# Check for required tools
echo "🔍 Checking required tools..."

if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js 18+ first."
    exit 1
fi

NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version $NODE_VERSION is too old. Please install Node.js 18+."
    exit 1
fi

if ! command -v pnpm &> /dev/null; then
    echo "📦 pnpm not found. Installing pnpm..."
    npm install -g pnpm
    echo "✅ pnpm installed"
else
    echo "✅ pnpm found"
fi

if ! command -v git &> /dev/null; then
    echo "❌ git not found. Please install git first."
    exit 1
fi

echo "✅ All required tools found"

# Check if this is a fork
ORIGIN_URL=$(git remote get-url origin 2>/dev/null || echo "")
if [[ $ORIGIN_URL == *"habibthadev/octograph"* ]]; then
    echo "ℹ️  This appears to be the original repository"
    echo "   For contributions, please fork the repository first"
else
    echo "✅ This appears to be a fork - good for contributing!"
fi

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install

# Verify installation
echo "🔍 Verifying installation..."

if [ ! -d "node_modules" ]; then
    echo "❌ Installation failed - node_modules not found"
    exit 1
fi

# Run basic checks
echo "🧪 Running basic checks..."

echo "  - Type checking..."
pnpm type-check

echo "  - Linting..."
pnpm lint

echo "  - Testing..."
pnpm test

echo "  - Building..."
pnpm build

echo ""
echo "🎉 Development setup complete!"
echo ""
echo "📋 Next Steps:"
echo "1. Start development servers:"
echo "   pnpm dev"
echo ""
echo "2. View the documentation:"
echo "   http://localhost:3000"
echo ""
echo "3. View the example app:"
echo "   http://localhost:3001"
echo ""
echo "4. Read the contributing guide:"
echo "   cat CONTRIBUTING.md"
echo ""
echo "5. Create a feature branch:"
echo "   git checkout -b feature/your-feature"
echo ""
echo "6. Make changes and add a changeset:"
echo "   pnpm changeset"
echo ""
echo "📖 For detailed guidelines, see CONTRIBUTING.md"
echo "🚀 Happy coding!"

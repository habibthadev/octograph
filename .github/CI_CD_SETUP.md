# CI/CD Setup for Octograph

This repository includes a comprehensive CI/CD pipeline that automates testing, building, deployment, and publishing.

## Overview

The CI/CD pipeline consists of four main workflows:

1. **CI** (`ci.yml`) - Runs on every push and PR
2. **Deploy** (`deploy.yml`) - Deploys to Vercel on main branch
3. **Release** (`release.yml`) - Handles NPM publishing and GitHub releases
4. **Dependencies** (`dependencies.yml`) - Weekly dependency updates

## Workflows

### 1. CI Workflow

- **Triggers**: Push to `main`/`develop`, PRs to `main`/`develop`
- **Jobs**:
  - Lint & Test: Type checking, linting, and testing
  - Build Apps: Builds docs and example apps
- **Caching**: Uses pnpm store caching for faster builds

### 2. Deploy Workflow

- **Triggers**: Push to `main`, manual dispatch
- **Jobs**:
  - Deploy Docs: Builds and deploys documentation to Vercel
  - Deploy Example: Builds and deploys example app to Vercel
- **Environment**: Production

### 3. Release Workflow

- **Triggers**: Push to `main`
- **Features**:
  - Uses Changesets for version management
  - Creates release PRs automatically
  - Publishes to NPM when changesets are merged
  - Creates GitHub releases with changelogs

### 4. Dependencies Workflow

- **Triggers**: Weekly schedule (Mondays 9 AM UTC), manual dispatch
- **Features**:
  - Updates all dependencies to latest versions
  - Runs tests to ensure compatibility
  - Creates PR with updates

## Setup Instructions

### 1. GitHub Secrets

Add the following secrets to your GitHub repository (`Settings > Secrets and variables > Actions`):

#### For NPM Publishing:

- `NPM_TOKEN`: Your NPM authentication token
  - Go to [npmjs.com](https://www.npmjs.com/) → Account → Access Tokens
  - Create a "Automation" token

#### For Vercel Deployment:

- `VERCEL_TOKEN`: Your Vercel personal access token
  - Go to [Vercel Dashboard](https://vercel.com/account/tokens)
  - Create a new token
- `VERCEL_ORG_ID`: Your Vercel organization ID
  - Found in your Vercel team settings
- `VERCEL_DOCS_PROJECT_ID`: Project ID for docs app
  - Create a project for docs on Vercel, copy the project ID
- `VERCEL_EXAMPLE_PROJECT_ID`: Project ID for example app
  - Create a project for example on Vercel, copy the project ID

### 2. Vercel Project Setup

1. **Create two projects on Vercel**:

   - One for `apps/docs` (documentation)
   - One for `apps/example` (example app)

2. **Configure each project**:

   - Root Directory: Point to `apps/docs` or `apps/example`
   - Framework Preset: Next.js
   - Node.js Version: 18.x
   - Build Command: `cd ../.. && pnpm build --filter [project-name]`
   - Install Command: `cd ../.. && pnpm install --frozen-lockfile`

3. **Get Project IDs**:
   - Go to Project Settings → General
   - Copy the Project ID
   - Add to GitHub secrets

### 3. NPM Package Setup

1. **Create NPM account** (if you don't have one)
2. **Verify email** and enable 2FA
3. **Create access token**:
   ```bash
   npm login
   npm token create --type=automation
   ```
4. **Add token to GitHub secrets** as `NPM_TOKEN`

### 4. Repository Setup

1. **Enable GitHub Actions**:

   - Go to `Settings > Actions > General`
   - Allow all actions and reusable workflows

2. **Configure branch protection** (recommended):
   - Go to `Settings > Branches`
   - Add rule for `main` branch
   - Require status checks: CI workflow
   - Require PR reviews

## Using the CI/CD Pipeline

### Making Changes

1. **Create a feature branch**:

   ```bash
   git checkout -b feature/new-feature
   ```

2. **Make your changes and commit**

3. **Push and create PR**:
   - CI will run automatically
   - Tests must pass before merging

### Creating Releases

1. **Add a changeset** (for any package changes):

   ```bash
   pnpm changeset
   ```

   - Select packages that changed
   - Choose version bump type (patch/minor/major)
   - Write changelog entry

2. **Commit the changeset**:

   ```bash
   git add .changeset/
   git commit -m "chore: add changeset"
   ```

3. **Merge to main**:
   - Release workflow creates a "Version Packages" PR
   - Review and merge the PR
   - Package will be published to NPM automatically
   - GitHub release will be created

### Manual Operations

- **Trigger deployment**: Go to Actions → Deploy to Vercel → Run workflow
- **Update dependencies**: Go to Actions → Dependency Updates → Run workflow
- **Emergency release**: Go to Actions → Release → Run workflow

## Monitoring

- **Action status**: Monitor in the Actions tab
- **Vercel deployments**: Check in Vercel dashboard
- **NPM packages**: Monitor downloads and versions on npmjs.com

## Troubleshooting

### Common Issues

1. **Build failures**:

   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Check TypeScript compilation errors

2. **Deployment failures**:

   - Verify Vercel tokens and project IDs
   - Check build commands in vercel.json
   - Ensure proper directory structure

3. **Publishing failures**:
   - Verify NPM token permissions
   - Check package.json configuration
   - Ensure version numbers are valid

### Getting Help

- Check workflow logs in GitHub Actions
- Review error messages carefully
- Ensure all secrets are properly configured
- Verify project structure matches expected format

---
name: CI/CD Setup Checklist
about: Track the setup of CI/CD pipeline
title: "Setup CI/CD Pipeline"
labels: ["setup", "cicd"]
assignees: []
---

## CI/CD Setup Checklist

Use this checklist to track the setup of the CI/CD pipeline for Octograph.

### 📋 Prerequisites

- [ ] Repository is set up with the octograph project
- [ ] You have admin access to the repository
- [ ] pnpm is installed and working
- [ ] Node.js 18+ is installed

### 🔐 GitHub Secrets Setup

- [ ] `NPM_TOKEN` - NPM authentication token for publishing
- [ ] `VERCEL_TOKEN` - Vercel personal access token
- [ ] `VERCEL_ORG_ID` - Vercel organization ID
- [ ] `VERCEL_DOCS_PROJECT_ID` - Project ID for docs deployment
- [ ] `VERCEL_EXAMPLE_PROJECT_ID` - Project ID for example app deployment

### 🚀 Vercel Projects Setup

- [ ] Created Vercel project for docs app (`apps/docs`)
  - [ ] Configured build settings
  - [ ] Set framework to Next.js
  - [ ] Configured build command: `cd ../.. && pnpm build --filter octograph-docs`
  - [ ] Configured install command: `cd ../.. && pnpm install --frozen-lockfile`
- [ ] Created Vercel project for example app (`apps/example`)
  - [ ] Configured build settings
  - [ ] Set framework to Next.js
  - [ ] Configured build command: `cd ../.. && pnpm build --filter octograph-example`
  - [ ] Configured install command: `cd ../.. && pnpm install --frozen-lockfile`

### 📦 NPM Setup

- [ ] NPM account created/verified
- [ ] 2FA enabled on NPM account
- [ ] Automation token created
- [ ] Token added to GitHub secrets
- [ ] Package name is available on NPM (check: `npm view octograph`)

### ⚙️ Repository Configuration

- [ ] GitHub Actions enabled
- [ ] Branch protection rules configured for `main` branch
  - [ ] Require status checks to pass (CI workflow)
  - [ ] Require pull request reviews
  - [ ] Dismiss stale reviews when new commits are pushed
- [ ] Changesets initialized and configured

### 🧪 Testing the Pipeline

- [ ] CI workflow runs successfully on PR
- [ ] Build workflow completes without errors
- [ ] Deploy workflow successfully deploys to Vercel (test on main branch)
- [ ] Release workflow can create and publish releases (test with changeset)

### 📝 Documentation

- [ ] Team members know how to use changesets
- [ ] Release process documented
- [ ] Deployment URLs shared with team

## 🛠️ Setup Commands

Run the setup helper script:

```bash
./scripts/setup-cicd.sh
```

Create your first changeset:

```bash
pnpm changeset
```

## 📖 Resources

- [Detailed Setup Guide](.github/CI_CD_SETUP.md)
- [Changesets Documentation](https://github.com/changesets/changesets)
- [Vercel Documentation](https://vercel.com/docs)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

## ❓ Questions or Issues?

If you encounter any issues during setup, please:

1. Check the workflow logs in the Actions tab
2. Review the setup guide at `.github/CI_CD_SETUP.md`
3. Comment on this issue with specific error messages

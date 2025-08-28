# Contributing to Octograph

Thank you for your interest in contributing to Octograph! We welcome contributions of all kinds, from bug reports and feature requests to code contributions and documentation improvements.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Release Process](#release-process)
- [Code Style](#code-style)
- [Testing](#testing)
- [Documentation](#documentation)
- [Pull Request Process](#pull-request-process)
- [Issue Guidelines](#issue-guidelines)

## Code of Conduct

This project adheres to a code of conduct adapted from the [Contributor Covenant](https://www.contributor-covenant.org/). By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

## Getting Started

### Prerequisites

- **Node.js**: 18.x or higher
- **pnpm**: 8.x or higher (recommended package manager)
- **Git**: Latest stable version

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/habibthadev/octograph.git
   cd octograph
   ```

## Development Setup

1. **Install dependencies**:

   ```bash
   pnpm install
   ```

2. **Start development servers**:

   ```bash
   pnpm dev
   ```

   This will start:

   - Package development server (watch mode)
   - Documentation site at `http://localhost:3000`
   - Example app at `http://localhost:3001`

3. **Run tests**:

   ```bash
   pnpm test
   ```

4. **Build everything**:
   ```bash
   pnpm build
   ```

## Making Changes

### Branch Strategy

- **main**: Production-ready code, protected branch
- **develop**: Development branch for ongoing work
- **feature/\***: Feature branches for new functionality
- **fix/\***: Bug fix branches
- **docs/\***: Documentation-only changes

### Workflow

1. **Create a feature branch**:

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following our [code style guidelines](#code-style)

3. **Write tests** for new functionality

4. **Update documentation** if needed

5. **Run the test suite**:

   ```bash
   pnpm test
   pnpm lint
   pnpm type-check
   ```

6. **Commit your changes** using conventional commits:
   ```bash
   git commit -m "feat: add new theme system"
   ```

## Release Process

We use [Changesets](https://github.com/changesets/changesets) for version management and releases.

### Adding a Changeset

When you make changes that should trigger a release, add a changeset:

```bash
pnpm changeset
```

This will prompt you to:

1. Select which packages have changed
2. Choose the type of change (major, minor, patch)
3. Write a summary of the changes

### Changeset Guidelines

**Major (Breaking Changes)**:

- API changes that break backward compatibility
- Removal of public APIs or props
- Changes to default behavior that could break existing code

**Minor (New Features)**:

- New components or features
- New props or configuration options
- Performance improvements
- New themes or customization options

**Patch (Bug Fixes)**:

- Bug fixes that don't change the API
- Documentation updates
- Internal refactoring
- Dependency updates

### Example Changeset

```markdown
---
"octograph": minor
---

Add new Vercel theme with improved color palette and better contrast ratios for accessibility.
```

## Code Style

### TypeScript

- Use TypeScript for all code
- Prefer interfaces over types for object shapes
- Use strict type checking
- Export types alongside components

### React

- Use function components with hooks
- Follow React best practices for performance
- Use proper prop types and defaults
- Implement proper accessibility attributes

### Styling

- Use Tailwind CSS for styling
- Follow BEM methodology for custom CSS classes
- Ensure responsive design principles
- Support both light and dark themes

### Naming Conventions

- **Components**: PascalCase (`OctoGraph`, `ThemeSelector`)
- **Files**: kebab-case for utilities, PascalCase for components
- **Variables**: camelCase
- **Constants**: SCREAMING_SNAKE_CASE
- **Types**: PascalCase with descriptive names

## Testing

### Test Requirements

- **Unit tests** for all utilities and hooks
- **Component tests** for React components
- **Integration tests** for complex workflows
- **Type tests** for TypeScript definitions

### Test Structure

```bash
src/
  components/
    __tests__/
      OctoGraph.test.tsx
  utils/
    __tests__/
      theme-utils.test.ts
```

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage

# Run tests for specific file
pnpm test OctoGraph
```

### Test Guidelines

- Write descriptive test names
- Test both happy path and edge cases
- Mock external dependencies
- Use React Testing Library for component tests
- Aim for high code coverage (>90%)

## Documentation

### Documentation Requirements

- **README**: Keep up-to-date with latest features
- **API Documentation**: Document all public APIs
- **Examples**: Provide working examples for features
- **Changelog**: Managed automatically via changesets

### Documentation Structure

- **apps/docs**: Main documentation site (Nextra)
- **apps/example**: Interactive examples
- **README.md**: Project overview and quick start
- **API documentation**: Auto-generated from TypeScript

### Writing Guidelines

- Use clear, concise language
- Provide code examples for all features
- Include TypeScript type information
- Test all code examples

## Pull Request Process

### Before Submitting

1. **Ensure CI passes**:

   - All tests pass
   - Linting passes
   - Type checking passes
   - Build succeeds

2. **Update documentation** if needed

3. **Add changeset** if your changes should trigger a release

4. **Write descriptive commit messages** using conventional commits

### PR Guidelines

1. **Title**: Use a descriptive title that summarizes the change
2. **Description**: Explain what changed and why
3. **Link issues**: Reference any related issues
4. **Screenshots**: Include screenshots for UI changes
5. **Breaking changes**: Clearly document any breaking changes

### PR Template

```markdown
## Description

Brief description of the changes made.

## Type of Change

- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Testing

- [ ] Tests pass locally
- [ ] Added new tests for new functionality
- [ ] Updated existing tests

## Documentation

- [ ] Updated README if needed
- [ ] Updated API documentation
- [ ] Added examples for new features

## Changeset

- [ ] Added changeset for this change
```

### Review Process

1. **Automated checks** must pass (CI/CD pipeline)
2. **Code review** by at least one maintainer
3. **Testing** on multiple environments if needed
4. **Documentation review** for accuracy

## Issue Guidelines

### Bug Reports

Use the bug report template and include:

- **Environment**: OS, Node.js version, browser
- **Steps to reproduce**: Clear, numbered steps
- **Expected behavior**: What should happen
- **Actual behavior**: What actually happens
- **Screenshots**: If applicable
- **Additional context**: Any relevant information

### Feature Requests

Use the feature request template and include:

- **Problem description**: What problem does this solve?
- **Proposed solution**: How should it work?
- **Alternatives considered**: Other approaches
- **Additional context**: Examples, use cases

### Documentation Issues

- Specify which documentation needs updating
- Provide suggestions for improvement
- Include examples if helpful

## Development Tips

### Monorepo Commands

```bash
# Work on specific package
pnpm --filter octograph dev
pnpm --filter octograph-docs dev

# Run command in all packages
pnpm --recursive test
pnpm --recursive build

# Add dependency to specific package
pnpm --filter octograph add react-query
```

### Debugging

- Use React DevTools for component debugging
- Use browser DevTools for performance profiling
- Check network tab for API calls
- Use TypeScript compiler for type checking

### Performance

- Profile components with React DevTools Profiler
- Optimize bundle size with bundle analyzer
- Test on various devices and network conditions
- Use React.memo() and useMemo() judiciously

## Getting Help

- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For questions and general discussion
- **Documentation**: Check the docs site first
- **Code Review**: Ask questions in PR comments

## Recognition

Contributors will be recognized in:

- **GitHub contributors list**
- **Release notes** for significant contributions
- **Documentation credits** for major documentation work

---

Thank you for contributing to Octograph! Your contributions help make this project better for everyone. 🚀

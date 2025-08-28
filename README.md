# Octograph

Beautiful, customizable GitHub contribution graphs for React applications. Transform GitHub activity data into stunning visual components with extensive theming and configuration options.

[![npm version](https://badge.fury.io/js/octograph.svg)](https://badge.fury.io/js/octograph)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/octograph)](https://bundlephobia.com/package/octograph)

## ✨ Features

- 🎨 **9 Built-in Themes** - GitHub, Shadcn, Vesper, Vercel, 11Labs, Prisma, Supabase, Ayu, Atom
- 🌓 **Dark Mode Support** - Automatic theme detection with manual override
- 📱 **Responsive Design** - Adapts beautifully to any screen size
- ⚡ **High Performance** - Optimized with React Query caching and lazy loading
- 🔒 **Type Safe** - Full TypeScript support with comprehensive type definitions
- 🎯 **Customizable** - Extensive theming and styling options
- ♿ **Accessible** - ARIA labels and keyboard navigation support
- � **SSR Ready** - Full Next.js and server-side rendering support
- 📦 **Tree Shakeable** - Import only what you need
- 🎪 **Framework Agnostic** - Works with any React-based framework

## 🚀 Quick Start

### Installation

```bash
npm install octograph @tanstack/react-query
# or
pnpm add octograph @tanstack/react-query
# or
yarn add octograph @tanstack/react-query
```

### Basic Usage

```tsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { OctoGraph } from "octograph";
import "octograph/styles";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <OctoGraph username="habibthadev" theme="github" />
    </QueryClientProvider>
  );
}
```

## 🎨 Themes

Octograph includes beautiful built-in themes inspired by popular design systems:

```tsx
// Built-in themes
<OctoGraph username="habibthadev" theme="shadcn" />
<OctoGraph username="habibthadev" theme="vesper" />
<OctoGraph username="habibthadev" theme="vercel" />
<OctoGraph username="habibthadev" theme="elevenlabs" />
<OctoGraph username="habibthadev" theme="prisma" />
<OctoGraph username="habibthadev" theme="supabase" />
<OctoGraph username="habibthadev" theme="ayu" />
<OctoGraph username="habibthadev" theme="atom" />
<OctoGraph username="habibthadev" theme="github" />

// Custom theme
<OctoGraph
  username="habibthadev"
  theme={{
    levels: {
      0: '#ebedf0',
      1: '#9be9a8',
      2: '#40c463',
      3: '#30a14e',
      4: '#216e39'
    }
  }}
/>
```

## 🔧 Advanced Usage

### Custom Cell Rendering

```tsx
<OctoGraph
  username="habibthadev"
  renderCell={({ date, count, level, size, color }) => (
    <circle
      cx={size / 2}
      cy={size / 2}
      r={size / 2 - 1}
      fill={color}
      onClick={() => alert(`${count} contributions on ${date}`)}
    />
  )}
/>
```

### Event Handling

```tsx
<OctoGraph
  username="habibthadev"
  onCellClick={(date, count) => {
    console.log(`Clicked: ${count} contributions on ${date}`);
  }}
  onCellHover={(date, count) => {
    console.log(`Hovered: ${count} contributions on ${date}`);
  }}
/>
```

### Server-Side Rendering

```tsx
// Next.js App Router
import { OctoGraph } from "octograph";

export default function ProfilePage() {
  return <OctoGraph username="habibthadev" mode="ssr" year={2023} />;
}
```

### Custom Hooks

```tsx
import { useOctograph } from "octograph";

function CustomGraph() {
  const { data, isLoading, error } = useOctograph("habibthadev", {
    year: 2023,
    cacheDuration: "1h",
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return <OctoGraph username="habibthadev" data={data} />;
}
```

## 📚 Documentation

Visit our [documentation site](https://octograph.dev) for:

- [Getting Started Guide](https://octograph.dev/getting-started)
- [Complete Props API](https://octograph.dev/props)
- [Theme Customization](https://octograph.dev/themes)
- [SSR Setup Guide](https://octograph.dev/ssr)
- [Live Examples](https://octograph.dev/examples)
- [API Reference](https://octograph.dev/api)

## 🔑 GitHub Token Setup

For production use, you'll need a GitHub personal access token:

1. Go to [GitHub Settings > Personal Access Tokens](https://github.com/settings/tokens)
2. Generate a new token with `read:user` scope
3. Add it to your environment variables:

```bash
# .env.local
GITHUB_TOKEN=your_token_here
# or for client-side
NEXT_PUBLIC_GITHUB_TOKEN=your_token_here
```

## 📦 Package Structure

This repository contains:

- **`packages/octograph`** - Main React component library
- **`apps/docs`** - Documentation site built with Nextra
- **`apps/example`** - Example Next.js application

## 🛠️ Development

```bash
# Clone the repository
git clone https://github.com/habibthadev/octograph.git
cd octograph

# Install dependencies
pnpm install

# Start development
pnpm dev

# Run tests
pnpm test

# Build packages
pnpm build
```

## 🚀 CI/CD Pipeline

This project includes a comprehensive CI/CD pipeline that automates:

- ✅ **Continuous Integration** - Automated testing and linting on every PR
- 🚀 **Automated Deployment** - Docs and examples deployed to Vercel
- 📦 **NPM Publishing** - Automatic package publishing with changesets
- 🔄 **Dependency Updates** - Weekly automated dependency updates

### Quick Setup

```bash
# Run the setup helper
./scripts/setup-cicd.sh
```

For detailed setup instructions, see [CI/CD Setup Guide](.github/CI_CD_SETUP.md).

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

### Release Process

1. Make your changes and create a PR
2. Add a changeset: `pnpm changeset`
3. Merge your PR to main
4. The release workflow will automatically:
   - Create a "Version Packages" PR
   - Publish to NPM when merged
   - Create GitHub releases

## 📄 License

MIT License - see [LICENSE](./LICENSE) for details.

## 🙏 Acknowledgments

- GitHub for the original contribution graph design
- [Radix UI](https://radix-ui.com/) for accessible components
- [TanStack Query](https://tanstack.com/query) for data fetching
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Zod](https://zod.dev/) for schema validation

---

Made with ❤️ by the Octograph team

import { useState, useMemo } from "react";
import Head from "next/head";
import { OctoGraph, generateMockData } from "octograph";
import { Header } from "@/components/Header";
import { cn } from "octograph";

const demoUsers = [
  {
    username: "habibthadev",
    name: "Habib Adebayo",
    description: "Creator of Octograph",
  },
  {
    username: "torvalds",
    name: "Linus Torvalds",
    description: "Creator of Linux",
  },
  {
    username: "gaearon",
    name: "Dan Abramov",
    description: "React team member",
  },
  {
    username: "sindresorhus",
    name: "Sindre Sorhus",
    description: "Open source maintainer",
  },
  {
    username: "kentcdodds",
    name: "Kent C. Dodds",
    description: "Testing and React expert",
  },
  {
    username: "leerob",
    name: "Lee Robinson",
    description: "VP of Product at Vercel",
  },
];

export default function Home() {
  const [selectedTheme, setSelectedTheme] = useState("github");
  const [selectedUser, setSelectedUser] = useState(demoUsers[0]);
  const [showTooltip, setShowTooltip] = useState(true);
  const [showLegend, setShowLegend] = useState(true);
  const [cellSize, setCellSize] = useState(11);
  const [cellRadius, setCellRadius] = useState(2);
  const [themeMode, setThemeMode] = useState<"light" | "dark">("light");

  const mockData = useMemo(() => generateMockData(2024), []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Head>
        <title>Octograph Examples - Interactive Playground</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Header currentTheme={selectedTheme} onThemeChange={setSelectedTheme} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Octograph Examples
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
            Beautiful, customizable GitHub contribution graphs for React.
            Explore different themes, configurations, and see how Octograph
            adapts to your needs.
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full">
              ✨ 9 Built-in Themes
            </span>
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
              🌓 Dark Mode Support
            </span>
            <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full">
              📱 Responsive Design
            </span>
            <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 rounded-full">
              ⚡ TypeScript Ready
            </span>
          </div>
        </div>

        {}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          {}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Customize
              </h3>

              {}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  GitHub User
                </label>
                <select
                  value={selectedUser.username}
                  onChange={(e) =>
                    setSelectedUser(
                      demoUsers.find((u) => u.username === e.target.value) ||
                        demoUsers[0]
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  {demoUsers.map((user) => (
                    <option key={user.username} value={user.username}>
                      {user.name}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {selectedUser.description}
                </p>
              </div>

              {}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Theme Mode
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setThemeMode("light")}
                    className={`px-3 py-1 text-sm rounded-md transition-colors ${
                      themeMode === "light"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    Light
                  </button>
                  <button
                    onClick={() => setThemeMode("dark")}
                    className={`px-3 py-1 text-sm rounded-md transition-colors ${
                      themeMode === "dark"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    Dark
                  </button>
                </div>
              </div>

              {}
              <div className="mb-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={showTooltip}
                    onChange={(e) => setShowTooltip(e.target.checked)}
                    className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    Show Tooltips
                  </span>
                </label>
              </div>

              {}
              <div className="mb-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={showLegend}
                    onChange={(e) => setShowLegend(e.target.checked)}
                    className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    Show Legend
                  </span>
                </label>
              </div>

              {}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Cell Size: {cellSize}px
                </label>
                <input
                  type="range"
                  min="8"
                  max="16"
                  value={cellSize}
                  onChange={(e) => setCellSize(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              {}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Theme Mode
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setThemeMode("light")}
                    className={cn(
                      "px-3 py-2 text-xs rounded-md transition-colors",
                      themeMode === "light"
                        ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    )}
                  >
                    ☀️ Light
                  </button>
                  <button
                    onClick={() => setThemeMode("dark")}
                    className={cn(
                      "px-3 py-2 text-xs rounded-md transition-colors",
                      themeMode === "dark"
                        ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    )}
                  >
                    🌙 Dark
                  </button>
                </div>
              </div>

              {}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Border Radius: {cellRadius}px
                </label>
                <input
                  type="range"
                  min="0"
                  max="6"
                  value={cellRadius}
                  onChange={(e) => setCellRadius(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <div className="text-xs text-gray-500 dark:text-gray-400 mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                <strong>Tip:</strong> Try different themes from the header
                dropdown to see how the same data looks with different color
                schemes.
              </div>
            </div>
          </div>

          {}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {selectedUser.name}&apos;s GitHub Activity
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    @{selectedUser.username} • 2025 contributions
                  </p>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Theme:{" "}
                  <span className="font-medium capitalize">
                    {selectedTheme}
                  </span>
                </div>
              </div>

              <div className="w-full overflow-x-auto">
                <div className="min-w-max flex justify-center">
                  <OctoGraph
                    username={selectedUser.username}
                    theme={selectedTheme as any}
                    themeMode={themeMode}
                    year={2025}
                    showTooltip={showTooltip}
                    showLegend={showLegend}
                    cellSize={cellSize}
                    cellRadius={cellRadius}
                    onCellClick={(date: string, count: number) => {
                      console.log("Cell clicked:", date, count);
                    }}
                    cacheDuration={"5m"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Theme Gallery
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
            Explore all 9 built-in themes with consistent data
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[
              "github",
              "shadcn",
              "vesper",
              "vercel",
              "11labs",
              "prisma",
              "supabase",
              "ayu",
              "atom",
            ].map((theme) => (
              <div
                key={theme}
                className="bg-white dark:bg-gray-800 rounded-lg p-3 md:p-4 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-900 dark:text-white capitalize text-sm md:text-base">
                    {theme}
                  </h3>
                  <button
                    onClick={() => setSelectedTheme(theme)}
                    className="px-2 md:px-3 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                  >
                    Use This
                  </button>
                </div>

                <div className="flex justify-center overflow-hidden">
                  <div className="transform scale-50 sm:scale-75 origin-center overflow-x-auto">
                    <div className="min-w-max">
                      <OctoGraph
                        username="demo"
                        theme={theme as any}
                        themeMode={themeMode}
                        year={2024}
                        cellSize={10}
                        showTooltip={false}
                        showLegend={false}
                        showMonthLabels={false}
                        showWeekdayLabels={false}
                        data={mockData}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 mb-12">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Current Configuration
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Here&apos;s the code to reproduce the current graph configuration:
          </p>

          <div className="bg-gray-50 dark:bg-gray-900 rounded-md p-4 overflow-x-auto">
            <pre className="text-sm text-gray-800 dark:text-gray-200">
              <code>{`import { OctoGraph } from 'octograph'

export default function MyComponent() {
  return (
    <OctoGraph
      username="${selectedUser.username}"
      theme="${selectedTheme}"
      themeMode="${themeMode}"
      year={2024}
      cellSize={${cellSize}}
      cellRadius={${cellRadius}}
      showTooltip={${showTooltip}}
      showLegend={${showLegend}}
    />
  )
}`}</code>
            </pre>
          </div>
        </div>

        {}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
              <span className="text-green-600 dark:text-green-400 text-xl">
                🎨
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Rich Theming
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              9 carefully crafted themes with automatic dark mode support.
              Create custom themes to match your brand.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
              <span className="text-blue-600 dark:text-blue-400 text-xl">
                📱
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Responsive Design
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Automatically adapts to any screen size. Perfect for dashboards,
              mobile apps, and responsive layouts.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
              <span className="text-purple-600 dark:text-purple-400 text-xl">
                ⚡
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              High Performance
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Built with React Query for smart caching. Lazy loading and SSR
              support for optimal performance.
            </p>
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600 dark:text-gray-400">
            <p className="mb-2">Built with ❤️ using Octograph v1.0.0</p>
            <p className="text-sm">
              <a
                href="https://github.com/your-org/octograph"
                className="hover:text-blue-600 dark:hover:text-blue-400"
              >
                View on GitHub
              </a>
              {" • "}
              <a
                href="https://octograph.dev"
                className="hover:text-blue-600 dark:hover:text-blue-400"
              >
                Documentation
              </a>
              {" • "}
              <a
                href="https://npmjs.com/package/octograph"
                className="hover:text-blue-600 dark:hover:text-blue-400"
              >
                NPM Package
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

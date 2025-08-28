# Octograph Examples

This example app demonstrates all features of the Octograph component library.

## Setup

1. **Install dependencies:**

   ```bash
   pnpm install
   ```

2. **Set up GitHub Token (Required):**

   The app now requires a real GitHub token to fetch contribution data. Create a `.env.local` file:

   ```bash
   cp .env.example .env.local
   ```

   Then edit `.env.local` and add your GitHub token:

   ```env
   NEXT_PUBLIC_GITHUB_TOKEN=your_github_token_here
   ```

   **How to get a GitHub token:**

   1. Go to [GitHub Personal Access Tokens](https://github.com/settings/personal-access-tokens)
   2. Click "Generate new token"
   3. Give it a name like "Octograph Demo"
   4. No additional scopes are needed for public data
   5. Copy the token and paste it in your `.env.local` file

3. **Run the development server:**

   ```bash
   pnpm dev
   ```

4. **Open the app:**
   Visit [http://localhost:3001](http://localhost:3001)

## What's New

### Fixed Issues:

✅ **No more auto-theme detection** - You now explicitly set light/dark mode  
✅ **Real GitHub data only** - No more mock data fallbacks  
✅ **Responsive theme gallery** - Themes display properly on all screen sizes  
✅ **Complete weekday labels** - Shows Sun through Sat  
✅ **Working tooltips** - Hover over contribution cells to see details  
✅ **Proper timeRange handling** - Date ranges work correctly  
✅ **Theme mode controls** - Switch between light and dark themes manually

### Features:

- **9 Beautiful Themes:** github, shadcn, vesper, vercel, 11labs, prisma, supabase, ayu, atom
- **Full Customization:** Cell size, radius, tooltips, legends, labels
- **TypeScript Support:** Fully typed for excellent developer experience
- **Responsive Design:** Works great on mobile, tablet, and desktop
- **Real-time Updates:** See changes instantly as you customize

## Usage

```tsx
import { OctoGraph } from "octograph";

export default function MyComponent() {
  return (
    <OctoGraph
      username="habibthadev"
      theme="github"
      themeMode="dark"
      year={2024}
      showTooltip={true}
      showLegend={true}
    />
  );
}
```

## Environment Variables

- `NEXT_PUBLIC_GITHUB_TOKEN` - Required GitHub personal access token for fetching contribution data

## Troubleshooting

**"GitHub token is required" error:**

- Make sure you have created `.env.local` with a valid GitHub token
- Restart the development server after adding the token

**No data showing:**

- Check that the GitHub username exists and is public
- Verify your GitHub token has the correct permissions
- Check the browser console for any error messages

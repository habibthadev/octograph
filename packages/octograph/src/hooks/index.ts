import {
  useState,
  useEffect,
  // useRef,
  useLayoutEffect,
  useCallback,
  EffectCallback,
  DependencyList,
} from "react";
import { useQuery } from "@tanstack/react-query";
import type {
  // GitHubUserContributions,
  GitHubContributionCalendar,
  UseOctographOptions,
  TimeRange,
} from "@/types";
import { GitHubUserContributionsSchema } from "@/types";
import { parseCacheDuration } from "@/utils";

const GITHUB_GRAPHQL_API = "https://api.github.com/graphql";

function buildGraphQLQuery(username: string, from: string, to: string): string {
  return `
    query {
      user(login: "${username}") {
        contributionsCollection(from: "${from}", to: "${to}") {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
                color
                contributionLevel
              }
              firstDay
            }
          }
        }
      }
    }
  `;
}

async function fetchGitHubContributions(
  username: string,
  year: number,
  timeRange?: TimeRange
): Promise<GitHubContributionCalendar> {
  const from = timeRange?.from || new Date(year, 0, 1);
  const to = timeRange?.to || new Date(year, 11, 31, 23, 59, 59);

  const fromISO = from.toISOString();
  const toISO = to.toISOString();

  const query = buildGraphQLQuery(username, fromISO, toISO);

  const token =
    process.env.GITHUB_TOKEN || process.env.NEXT_PUBLIC_GITHUB_TOKEN;

  if (!token) {
    throw new Error(
      "GitHub token is required. Please set GITHUB_TOKEN or NEXT_PUBLIC_GITHUB_TOKEN environment variable."
    );
  }

  const response = await fetch(GITHUB_GRAPHQL_API, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    throw new Error(
      `GitHub API error: ${response.status} ${response.statusText}`
    );
  }

  const data = await response.json();

  if (data.errors) {
    throw new Error(`GraphQL errors: ${JSON.stringify(data.errors)}`);
  }

  const validatedData = GitHubUserContributionsSchema.parse(data);
  return validatedData.data.user.contributionsCollection.contributionCalendar;
}

export function useOctograph(
  username: string,
  options: UseOctographOptions = {}
) {
  const {
    year = new Date().getFullYear(),
    timeRange,
    cacheDuration = "10m",
    enabled = true,
  } = options;

  const staleTime = parseCacheDuration(cacheDuration);
  const cacheTime = staleTime * 2;

  return useQuery({
    queryKey: ["octograph", username, year, timeRange],
    queryFn: () => fetchGitHubContributions(username, year, timeRange),
    staleTime,
    gcTime: cacheTime,
    enabled: enabled && !!username,
    retry: (failureCount, error) => {
      if (error instanceof Error && error.message.includes("401")) {
        return false;
      }
      return failureCount < 2;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}

export function useOctographSSR(
  // _username: string,
  // _year: number = new Date().getFullYear(),
  // _timeRange?: TimeRange
): GitHubContributionCalendar {
  throw new Error(
    "useOctographSSR requires server-side data fetching. Please pre-fetch data and pass it via the 'data' prop instead."
  );
}

export function useOctographManual(data: GitHubContributionCalendar | null) {
  return {
    data,
    isLoading: false,
    isError: false,
    error: null,
    refetch: () => Promise.resolve({ data }),
    isSuccess: !!data,
    status: data ? ("success" as const) : ("pending" as const),
  };
}

export function useIsomorphicLayoutEffect(
  effect: EffectCallback,
  deps?: DependencyList
) {
  const useIsomorphicLayoutEffect =
    typeof window !== "undefined" ? useLayoutEffect : useEffect;
  return useIsomorphicLayoutEffect(effect, deps);
}

export function useThemeMode(initialMode: "light" | "dark" = "light"): {
  mode: "light" | "dark";
  setMode: (mode: "light" | "dark") => void;
} {
  const [mode, setMode] = useState<"light" | "dark">(initialMode);

  return { mode, setMode };
}

export function useErrorBoundary() {
  const [error, setError] = useState<Error | null>(null);

  const resetError = useCallback(() => {
    setError(null);
  }, []);

  const captureError = useCallback((error: Error) => {
    setError(error);
  }, []);

  useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  return { captureError, resetError };
}

export function useResponsiveCellSize(baseCellSize: number = 12) {
  const [cellSize, setCellSize] = useState(baseCellSize);

  useEffect(() => {
    const updateCellSize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setCellSize(Math.max(8, baseCellSize - 4));
      } else if (width < 768) {
        setCellSize(Math.max(10, baseCellSize - 2));
      } else {
        setCellSize(baseCellSize);
      }
    };

    updateCellSize();
    window.addEventListener("resize", updateCellSize);
    return () => window.removeEventListener("resize", updateCellSize);
  }, [baseCellSize]);

  return cellSize;
}

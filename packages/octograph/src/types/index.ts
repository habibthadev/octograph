import React from "react";
import { z } from "zod";


export const GitHubContributionSchema = z.object({
  contributionCount: z.number(),
  date: z.string(),
  color: z.string(),
  contributionLevel: z.enum([
    "NONE",
    "FIRST_QUARTILE",
    "SECOND_QUARTILE",
    "THIRD_QUARTILE",
    "FOURTH_QUARTILE",
  ]),
});

export const GitHubContributionWeekSchema = z.object({
  contributionDays: z.array(GitHubContributionSchema),
  firstDay: z.string(),
});

export const GitHubContributionCalendarSchema = z.object({
  totalContributions: z.number(),
  weeks: z.array(GitHubContributionWeekSchema),
});

export const GitHubUserContributionsSchema = z.object({
  data: z.object({
    user: z.object({
      contributionsCollection: z.object({
        contributionCalendar: GitHubContributionCalendarSchema,
      }),
    }),
  }),
});


export type GitHubContribution = z.infer<typeof GitHubContributionSchema>;
export type GitHubContributionWeek = z.infer<
  typeof GitHubContributionWeekSchema
>;
export type GitHubContributionCalendar = z.infer<
  typeof GitHubContributionCalendarSchema
>;
export type GitHubUserContributions = z.infer<
  typeof GitHubUserContributionsSchema
>;

export interface ThemeColors {
  background: string;
  foreground: string;
  border: string;
  muted: string;
  mutedForeground: string;
  card: string;
  cardForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  destructiveForeground: string;
  ring: string;
  levels: {
    0: string; 
    1: string; 
    2: string; 
    3: string; 
    4: string; 
  };
}

export interface OctographTheme {
  name: string;
  colors: {
    light: ThemeColors;
    dark: ThemeColors;
  };
}

export interface CustomTheme {
  background?: string;
  foreground?: string;
  border?: string;
  muted?: string;
  mutedForeground?: string;
  card?: string;
  cardForeground?: string;
  primary?: string;
  primaryForeground?: string;
  secondary?: string;
  secondaryForeground?: string;
  accent?: string;
  accentForeground?: string;
  destructive?: string;
  destructiveForeground?: string;
  ring?: string;
  levels?: {
    0?: string;
    1?: string;
    2?: string;
    3?: string;
    4?: string;
  };
}

export type CacheDuration = string | number;

export interface TimeRange {
  from: Date;
  to: Date;
}

export interface OctographProps {
  username: string;
  year?: number;
  theme?: string | CustomTheme;
  themeMode?: "light" | "dark";
  timeRange?: TimeRange;
  mode?: "csr" | "ssr";
  cacheDuration?: CacheDuration;
  cellSize?: number;
  cellRadius?: number;
  showTooltip?: boolean;
  showMonthLabels?: boolean;
  showWeekdayLabels?: boolean;
  showLegend?: boolean;
  onCellClick?: (date: string, count: number) => void;
  onCellHover?: (date: string, count: number) => void;
  className?: string;
  loading?: boolean;
  error?: boolean;
  data?: GitHubContributionCalendar;
  renderCell?: (props: CellRenderProps) => React.ReactNode;
}

export interface CellRenderProps {
  date: string;
  count: number;
  level: number;
  size: number;
  radius: number;
  color: string;
  onClick?: () => void;
  onHover?: () => void;
  "aria-label": string;
}

export interface UseOctographOptions {
  year?: number;
  timeRange?: TimeRange;
  cacheDuration?: CacheDuration;
  enabled?: boolean;
}

export interface ContributionData {
  date: string;
  count: number;
  level: number;
}

export interface ProcessedData {
  contributions: ContributionData[];
  totalContributions: number;
  weeks: ContributionData[][];
  months: { name: string; firstDay: number; daysInMonth: number }[];
  yearStart: Date;
  yearEnd: Date;
}

export type ContributionLevel = 0 | 1 | 2 | 3 | 4;

export interface WeekdayLabels {
  sun: string;
  mon: string;
  tue: string;
  wed: string;
  thu: string;
  fri: string;
  sat: string;
}

export interface MonthLabels {
  jan: string;
  feb: string;
  mar: string;
  apr: string;
  may: string;
  jun: string;
  jul: string;
  aug: string;
  sep: string;
  oct: string;
  nov: string;
  dec: string;
}

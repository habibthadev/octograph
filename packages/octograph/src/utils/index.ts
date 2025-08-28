import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  format,
  startOfYear,
  endOfYear,
  eachWeekOfInterval,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  getDay,
  isSameDay,
  parseISO,
  getMonth,
  getDate,
} from "date-fns";
import type {
  CacheDuration,
  ContributionData,
  ProcessedData,
  GitHubContributionCalendar,
  ContributionLevel,
  WeekdayLabels,
  MonthLabels,
} from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseCacheDuration(duration: CacheDuration): number {
  if (typeof duration === "number") {
    return duration;
  }

  const match = duration.match(/^(\d+)([smhdy])$/);
  if (!match) {
    throw new Error(`Invalid cache duration format: ${duration}`);
  }

  const [, value, unit] = match;
  const numValue = parseInt(value, 10);

  switch (unit) {
    case "s":
      return numValue * 1000;
    case "m":
      return numValue * 60 * 1000;
    case "h":
      return numValue * 60 * 60 * 1000;
    case "d":
      return numValue * 24 * 60 * 60 * 1000;
    case "y":
      return numValue * 365 * 24 * 60 * 60 * 1000;
    default:
      return 5 * 60 * 1000;
  }
}

export function getContributionLevel(count: number): ContributionLevel {
  if (count === 0) return 0;
  if (count <= 3) return 1;
  if (count <= 6) return 2;
  if (count <= 9) return 3;
  return 4;
}

export function processContributionData(
  data: GitHubContributionCalendar,
  year: number
): ProcessedData {
  const yearStart = startOfYear(new Date(year, 0, 1));
  const yearEnd = endOfYear(new Date(year, 0, 1));

  const contributionMap = new Map<string, number>();

  data.weeks.forEach((week) => {
    week.contributionDays.forEach((day) => {
      contributionMap.set(day.date, day.contributionCount);
    });
  });

  const allDays = eachDayOfInterval({ start: yearStart, end: yearEnd });

  const contributions: ContributionData[] = allDays.map((date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    const count = contributionMap.get(dateStr) || 0;
    return {
      date: dateStr,
      count,
      level: getContributionLevel(count),
    };
  });

  const weeks: ContributionData[][] = [];
  const weekIntervals = eachWeekOfInterval(
    { start: yearStart, end: yearEnd },
    { weekStartsOn: 0 }
  );

  weekIntervals.forEach((weekStart) => {
    const weekEnd = endOfWeek(weekStart, { weekStartsOn: 0 });
    const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

    const weekContributions = weekDays
      .filter((day) => day >= yearStart && day <= yearEnd)
      .map((day) => {
        const dateStr = format(day, "yyyy-MM-dd");
        const contribution = contributions.find((c) => c.date === dateStr);
        return (
          contribution || {
            date: dateStr,
            count: 0,
            level: 0,
          }
        );
      });

    if (weekContributions.length > 0) {
      weeks.push(weekContributions);
    }
  });

  const months = Array.from({ length: 12 }, (_, i) => {
    const monthDate = new Date(year, i, 1);
    return {
      name: format(monthDate, "MMM"),
      firstDay: getDate(monthDate),
      daysInMonth: new Date(year, i + 1, 0).getDate(),
    };
  });

  return {
    contributions,
    totalContributions: data.totalContributions,
    weeks,
    months,
    yearStart,
    yearEnd,
  };
}

export function formatTooltipDate(dateStr: string): string {
  const date = parseISO(dateStr);
  return format(date, "MMM d, yyyy");
}

export function formatContributionText(count: number): string {
  if (count === 0) return "No contributions";
  if (count === 1) return "1 contribution";
  return `${count} contributions`;
}

export function getWeekdayLabels(): WeekdayLabels {
  return {
    sun: "Sun",
    mon: "Mon",
    tue: "Tue",
    wed: "Wed",
    thu: "Thu",
    fri: "Fri",
    sat: "Sat",
  };
}

export function getMonthLabels(): MonthLabels {
  return {
    jan: "Jan",
    feb: "Feb",
    mar: "Mar",
    apr: "Apr",
    may: "May",
    jun: "Jun",
    jul: "Jul",
    aug: "Aug",
    sep: "Sep",
    oct: "Oct",
    nov: "Nov",
    dec: "Dec",
  };
}

export function getAriaLabel(date: string, count: number): string {
  const formattedDate = formatTooltipDate(date);
  const contributionText = formatContributionText(count);
  return `${contributionText} on ${formattedDate}`;
}

export function calculateCellColor(
  level: ContributionLevel,
  theme: any
): string {
  return theme.levels[level] || theme.levels[0];
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

export function generateMockData(year: number): GitHubContributionCalendar {
  const yearStart = startOfYear(new Date(year, 0, 1));
  const yearEnd = endOfYear(new Date(year, 0, 1));

  const weeks: any[] = [];
  const weekIntervals = eachWeekOfInterval(
    { start: yearStart, end: yearEnd },
    { weekStartsOn: 0 }
  );

  let totalContributions = 0;

  weekIntervals.forEach((weekStart) => {
    const weekEnd = endOfWeek(weekStart, { weekStartsOn: 0 });
    const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

    const contributionDays = weekDays
      .filter((day) => day >= yearStart && day <= yearEnd)
      .map((day) => {
        const count = Math.floor(Math.random() * 15);
        totalContributions += count;

        return {
          date: format(day, "yyyy-MM-dd"),
          contributionCount: count,
          color: "#000000",
          contributionLevel:
            count === 0
              ? "NONE"
              : count <= 3
              ? "FIRST_QUARTILE"
              : count <= 6
              ? "SECOND_QUARTILE"
              : count <= 9
              ? "THIRD_QUARTILE"
              : "FOURTH_QUARTILE",
        };
      });

    if (contributionDays.length > 0) {
      weeks.push({
        contributionDays,
        firstDay: format(weekStart, "yyyy-MM-dd"),
      });
    }
  });

  return {
    totalContributions,
    weeks,
  };
}

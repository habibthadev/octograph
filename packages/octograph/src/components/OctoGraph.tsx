import React, { useMemo, CSSProperties } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import {
  cn,
  processContributionData,
  formatTooltipDate,
  formatContributionText,
  getAriaLabel,
} from "@/utils";
import { getTheme, isValidThemeName, defaultTheme } from "@/themes";
import {
  useOctograph,
  useOctographManual,
  useThemeMode,
  useResponsiveCellSize,
} from "@/hooks";
import type {
  OctographProps,
  CustomTheme,
  ThemeColors,
  ContributionData,
  ProcessedData,
} from "@/types";

interface ContributionCellProps {
  contribution: ContributionData;
  cellSize: number;
  cellRadius: number;
  color: string;
  showTooltip: boolean;
  onCellClick?: (date: string, count: number) => void;
  onCellHover?: (date: string, count: number) => void;
  renderCell?: OctographProps["renderCell"];
}

const ContributionCell: React.FC<ContributionCellProps> = ({
  contribution,
  cellSize,
  cellRadius,
  color,
  showTooltip,
  onCellClick,
  onCellHover,
  renderCell,
}) => {
  const ariaLabel = getAriaLabel(contribution.date, contribution.count);

  const handleClick = () => {
    onCellClick?.(contribution.date, contribution.count);
  };

  const handleHover = () => {
    onCellHover?.(contribution.date, contribution.count);
  };

  const cellProps = {
    date: contribution.date,
    count: contribution.count,
    level: contribution.level,
    size: cellSize,
    radius: cellRadius,
    color,
    onClick: onCellClick ? handleClick : undefined,
    onHover: onCellHover ? handleHover : undefined,
    "aria-label": ariaLabel,
  };

  if (renderCell) {
    return <>{renderCell(cellProps)}</>;
  }

  const cellElement = (
    <rect
      x={0}
      y={0}
      width={cellSize}
      height={cellSize}
      rx={cellRadius}
      ry={cellRadius}
      fill={color}
      className={cn(
        "transition-all duration-150 ease-out",
        onCellClick && "cursor-pointer hover:opacity-80"
      )}
      onClick={handleClick}
      onMouseEnter={handleHover}
      aria-label={ariaLabel}
      role={onCellClick ? "button" : "img"}
      tabIndex={onCellClick ? 0 : -1}
      onKeyDown={(e) => {
        if (onCellClick && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          handleClick();
        }
      }}
    />
  );

  if (!showTooltip) {
    return cellElement;
  }

  return (
    <Tooltip delayDuration={200}>
      <TooltipTrigger asChild>
        <g>{cellElement}</g>
      </TooltipTrigger>
      <TooltipContent
        className="bg-gray-900 text-white text-xs p-2 rounded shadow-lg border-none"
        sideOffset={5}
      >
        <div>
          <div className="font-medium">
            {formatContributionText(contribution.count)}
          </div>
          <div className="text-gray-300">
            {formatTooltipDate(contribution.date)}
          </div>
        </div>
      </TooltipContent>
    </Tooltip>
  );
};

interface ContributionGridProps {
  processedData: ProcessedData;
  cellSize: number;
  cellGap: number;
  cellRadius: number;
  themeColors: ThemeColors;
  themeMode: "light" | "dark";
  showTooltip: boolean;
  showMonthLabels: boolean;
  showWeekdayLabels: boolean;
  onCellClick?: OctographProps["onCellClick"];
  onCellHover?: OctographProps["onCellHover"];
  renderCell?: OctographProps["renderCell"];
}

const ContributionGrid: React.FC<ContributionGridProps> = ({
  processedData,
  cellSize,
  cellGap,
  cellRadius,
  themeColors,
  themeMode,
  showTooltip,
  showMonthLabels,
  showWeekdayLabels,
  onCellClick,
  onCellHover,
  renderCell,
}) => {
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const gridWidth = processedData.weeks.length * (cellSize + cellGap) - cellGap;
  const gridHeight = 7 * (cellSize + cellGap) - cellGap;

  const monthLabelHeight = showMonthLabels ? 20 : 0;
  const weekdayLabelWidth = showWeekdayLabels ? 30 : 0;

  const totalWidth = gridWidth + weekdayLabelWidth;
  const totalHeight = gridHeight + monthLabelHeight;

  const getCellColor = (level: number): string => {
    return (
      themeColors.levels[level as keyof typeof themeColors.levels] ||
      themeColors.levels[0]
    );
  };

  const textColorClass =
    themeMode === "light" ? "fill-gray-600" : "fill-gray-300";

  const textFillStyle: CSSProperties =
    themeMode === "light"
      ? { fill: "rgb(75, 85, 99)" }
      : { fill: "rgb(209, 213, 219)" };

  return (
    <svg
      width={totalWidth}
      height={totalHeight}
      className="octograph-grid"
      role="img"
      aria-label={`GitHub contribution graph showing ${processedData.totalContributions} contributions`}
    >
      {}
      {showMonthLabels && (
        <g className="month-labels">
          {months.map((month, index) => {
            const weekIndex = Math.floor((index * 365) / 12 / 7);
            const x = weekdayLabelWidth + weekIndex * (cellSize + cellGap);

            if (
              x < weekdayLabelWidth ||
              weekIndex >= processedData.weeks.length
            )
              return null;

            return (
              <text
                key={month}
                x={x}
                y={monthLabelHeight - 5}
                className="text-xs"
                style={textFillStyle}
                textAnchor="start"
              >
                {month}
              </text>
            );
          })}
        </g>
      )}

      {}
      {showWeekdayLabels && (
        <g className="weekday-labels">
          {weekdays.map((day, index) => {
            return (
              <text
                key={day}
                x={weekdayLabelWidth - 5}
                y={
                  monthLabelHeight + index * (cellSize + cellGap) + cellSize / 2
                }
                className="text-xs"
                style={textFillStyle}
                textAnchor="end"
                dominantBaseline="middle"
              >
                {day}
              </text>
            );
          })}
        </g>
      )}

      {}
      <g
        className="contribution-cells"
        transform={`translate(${weekdayLabelWidth}, ${monthLabelHeight})`}
      >
        {processedData.weeks.map((week, weekIndex) => (
          <g
            key={weekIndex}
            transform={`translate(${weekIndex * (cellSize + cellGap)}, 0)`}
          >
            {week.map((contribution, dayIndex) => (
              <g
                key={contribution.date}
                transform={`translate(0, ${dayIndex * (cellSize + cellGap)})`}
              >
                <ContributionCell
                  contribution={contribution}
                  cellSize={cellSize}
                  cellRadius={cellRadius}
                  color={getCellColor(contribution.level)}
                  showTooltip={showTooltip}
                  onCellClick={onCellClick}
                  onCellHover={onCellHover}
                  renderCell={renderCell}
                />
              </g>
            ))}
          </g>
        ))}
      </g>
    </svg>
  );
};

interface LegendProps {
  themeColors: ThemeColors;
  themeMode: "light" | "dark";
  cellSize: number;
  cellRadius: number;
}

const Legend: React.FC<LegendProps> = ({
  themeColors,
  themeMode,
  cellSize,
  cellRadius,
}) => {
  const levels = [0, 1, 2, 3, 4];

  return (
    <div className="flex items-center gap-2 text-xs">
      <span
        className={cn(
          themeMode === "light" ? "text-gray-600" : "text-gray-300"
        )}
      >
        Less
      </span>
      <div className="flex gap-1">
        {levels.map((level, index) => (
          <svg key={level} width={cellSize} height={cellSize}>
            <rect
              width={cellSize}
              height={cellSize}
              rx={cellRadius}
              ry={cellRadius}
              fill={
                themeColors.levels[level as keyof typeof themeColors.levels]
              }
            />
          </svg>
        ))}
      </div>
      <span
        className={cn(
          themeMode === "light" ? "text-gray-600" : "text-gray-300"
        )}
      >
        More
      </span>
    </div>
  );
};

const LoadingState: React.FC<{ cellSize: number; cellGap: number }> = ({
  cellSize,
  cellGap,
}) => {
  const weeks = 53;
  const days = 7;

  return (
    <div className="animate-pulse">
      <svg
        width={weeks * (cellSize + cellGap)}
        height={days * (cellSize + cellGap)}
      >
        {Array.from({ length: weeks }, (_, weekIndex) => (
          <g
            key={weekIndex}
            transform={`translate(${weekIndex * (cellSize + cellGap)}, 0)`}
          >
            {Array.from({ length: days }, (_, dayIndex) => (
              <rect
                key={dayIndex}
                x={0}
                y={dayIndex * (cellSize + cellGap)}
                width={cellSize}
                height={cellSize}
                rx={2}
                fill="currentColor"
                className="text-muted/30"
              />
            ))}
          </g>
        ))}
      </svg>
    </div>
  );
};

const ErrorState: React.FC<{ error: any; onRetry?: () => void }> = ({
  error,
  onRetry,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="text-destructive mb-2">
        <svg
          className="h-8 w-8 mx-auto mb-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.962-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z"
          />
        </svg>
      </div>
      <h3 className="text-lg font-semibold mb-1">
        Failed to load contributions
      </h3>
      <p className="text-sm text-muted-foreground mb-4">
        {error?.message || "An error occurred while fetching data"}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm hover:bg-primary/90 transition-colors"
        >
          Try again
        </button>
      )}
    </div>
  );
};

export const OctoGraph: React.FC<OctographProps> = ({
  username,
  year = new Date().getFullYear(),
  theme = defaultTheme,
  timeRange,
  mode = "csr",
  cacheDuration = "10m",
  cellSize = 12,
  cellRadius = 2,
  showTooltip = true,
  showMonthLabels = true,
  showWeekdayLabels = true,
  showLegend = true,
  onCellClick,
  onCellHover,
  className,
  loading = false,
  error = false,
  data: providedData,
  renderCell,
  themeMode = "light",
}) => {
  const responsiveCellSize = useResponsiveCellSize(cellSize);
  const finalCellSize = responsiveCellSize;
  const cellGap = Math.max(2, Math.floor(finalCellSize * 0.2));

  const themeColors: ThemeColors = useMemo(() => {
    if (typeof theme === "string") {
      const themeName = isValidThemeName(theme) ? theme : defaultTheme;
      return getTheme(themeName, themeMode);
    } else {
      const baseTheme = getTheme(defaultTheme, themeMode);
      return {
        ...baseTheme,
        ...theme,
        levels: {
          ...baseTheme.levels,
          ...theme.levels,
        },
      };
    }
  }, [theme, themeMode]);

  const queryResult = useOctograph(username, {
    year,
    timeRange,
    cacheDuration,
    enabled: mode === "csr" && !providedData && !loading && !error,
  });

  const manualResult = useOctographManual(providedData || null);

  const result = providedData ? manualResult : queryResult;

  console.log("Query result:", {
    isLoading: result.isLoading,
    isError: result.isError,
    error: result.error,
    data: result.data,
  });

  const processedData: ProcessedData | null = useMemo(() => {
    if (!result.data) {
      console.log("No result data available");
      return null;
    }
    console.log("Processing contribution data:", result.data);
    const processed = processContributionData(result.data, year);
    console.log("Processed data:", processed);
    return processed;
  }, [result.data, year]);

  if (loading || result.isLoading) {
    return (
      <TooltipProvider>
        <div className={cn("octograph-container", className)}>
          <LoadingState cellSize={finalCellSize} cellGap={cellGap} />
        </div>
      </TooltipProvider>
    );
  }

  if (error || result.isError) {
    return (
      <div className={cn("octograph-container", className)}>
        <ErrorState error={result.error} onRetry={result.refetch} />
      </div>
    );
  }

  if (!processedData) {
    return (
      <div className={cn("octograph-container", className)}>
        <div className="flex items-center justify-center p-8 text-muted-foreground">
          No contribution data available
        </div>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div
        className={cn("octograph-container", className)}
        style={
          {
            "--octograph-background": themeColors.background,
            "--octograph-foreground": themeColors.foreground,
            "--octograph-border": themeColors.border,
            "--octograph-muted": themeColors.muted,
            "--octograph-muted-foreground": themeColors.mutedForeground,
          } as CSSProperties
        }
      >
        <div className="space-y-4">
          {}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3
                className={cn(
                  "text-lg font-semibold",
                  themeMode === "light" ? "text-gray-900" : "text-white"
                )}
              >
                {username}'s contributions
              </h3>
              <p
                className={cn(
                  "text-sm",
                  themeMode === "light" ? "text-gray-600" : "text-gray-300"
                )}
              >
                {processedData.totalContributions} contributions in {year}
              </p>
            </div>
            {showLegend && (
              <Legend
                themeColors={themeColors}
                themeMode={themeMode}
                cellSize={finalCellSize}
                cellRadius={cellRadius}
              />
            )}
          </div>

          {}
          <div className="octograph-grid-container w-full overflow-x-auto">
            <div className="min-w-max">
              <ContributionGrid
                processedData={processedData}
                cellSize={finalCellSize}
                cellGap={cellGap}
                cellRadius={cellRadius}
                themeColors={themeColors}
                themeMode={themeMode}
                showTooltip={showTooltip}
                showMonthLabels={showMonthLabels}
                showWeekdayLabels={showWeekdayLabels}
                onCellClick={onCellClick}
                onCellHover={onCellHover}
                renderCell={renderCell}
              />
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default OctoGraph;

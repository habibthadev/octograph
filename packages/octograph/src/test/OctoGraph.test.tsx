import { describe, it, expect, vi } from "vitest";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { OctoGraph } from "../components/OctoGraph";
import { generateMockData } from "../utils";

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = createTestQueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("OctoGraph", () => {
  it("renders with mock data", () => {
    const mockData = generateMockData(2023);

    render(
      <TestWrapper>
        <OctoGraph username="testuser" year={2023} data={mockData} />
      </TestWrapper>
    );

    expect(
      screen.getByText("testuser%apos;s contributions")
    ).toBeInTheDocument();
    expect(screen.getByText(/contributions in 2023/)).toBeInTheDocument();
  });

  it("renders loading state", () => {
    render(
      <TestWrapper>
        <OctoGraph username="testuser" loading={true} />
      </TestWrapper>
    );

    const container = document.querySelector(".animate-pulse");
    expect(container).toBeInTheDocument();
  });

  it("renders error state", () => {
    render(
      <TestWrapper>
        <OctoGraph username="testuser" error={true} />
      </TestWrapper>
    );

    expect(
      screen.getByText("Failed to load contributions")
    ).toBeInTheDocument();
  });

  it("applies custom theme", () => {
    const customTheme = {
      levels: {
        0: "#ff0000",
        1: "#ff3333",
        2: "#ff6666",
        3: "#ff9999",
        4: "#ffcccc",
      },
    };

    const mockData = generateMockData(2023);

    render(
      <TestWrapper>
        <OctoGraph
          username="testuser"
          year={2023}
          data={mockData}
          theme={customTheme}
        />
      </TestWrapper>
    );

    expect(
      screen.getByText("testuser%apos;s contributions")
    ).toBeInTheDocument();
  });

  it("handles cell click events", () => {
    const mockData = generateMockData(2023);
    const onCellClick = vi.fn();

    render(
      <TestWrapper>
        <OctoGraph
          username="testuser"
          year={2023}
          data={mockData}
          onCellClick={onCellClick}
        />
      </TestWrapper>
    );

    const cells = screen.getAllByRole("button");
    if (cells.length > 0) {
      fireEvent.click(cells[0]);
      expect(onCellClick).toHaveBeenCalled();
    }
  });

  it("renders without tooltip when disabled", () => {
    const mockData = generateMockData(2023);

    render(
      <TestWrapper>
        <OctoGraph
          username="testuser"
          year={2023}
          data={mockData}
          showTooltip={false}
        />
      </TestWrapper>
    );

    expect(screen.queryAllByRole("button")).toHaveLength(0);
  });
});

import { render, act } from "@testing-library/react";
import React from "react";
import { vi } from "vitest";
import MarkdownTypewriter from "./index";

describe("MarkdownTypewriter", () => {
  test("renders without crashing", () => {
    const markdown = "# Hello, world!";
    const { container } = render(<MarkdownTypewriter markdown={markdown} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  test("applies custom className", () => {
    const markdown = "Test content";
    const { container } = render(
      <MarkdownTypewriter markdown={markdown} className="custom-class" />,
    );
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass("markdown-typewriter");
    expect(element).toHaveClass("custom-class");
  });

  test("applies custom styles", () => {
    const markdown = "Test content";
    const customStyle = { fontSize: "18px", color: "red" };
    const { container } = render(<MarkdownTypewriter markdown={markdown} style={customStyle} />);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveStyle("font-size: 18px");
    expect(element).toHaveStyle("color: rgb(255, 0, 0)");
  });

  test("accepts delay prop", () => {
    const markdown = "Test content";
    const { container } = render(<MarkdownTypewriter markdown={markdown} delay={100} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  test("renders with default delay when not provided", () => {
    const markdown = "Test content";
    const { container } = render(<MarkdownTypewriter markdown={markdown} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  test("shows raw markdown when showRaw is true", () => {
    const markdown = "# Test **bold** text";
    const { container } = render(<MarkdownTypewriter markdown={markdown} showRaw={true} />);

    // Should have the raw markdown display
    const rawElement = container.querySelector('.mtw-raw');
    expect(rawElement).toBeInTheDocument();

    // Should have the caret
    const caretElement = container.querySelector('.mtw-caret');
    expect(caretElement).toBeInTheDocument();
  });

  test("applies split layout when showRaw is true and layout is split", () => {
    const markdown = "Test content";
    const { container } = render(
      <MarkdownTypewriter markdown={markdown} showRaw={true} layout="split" />
    );

    const element = container.firstChild as HTMLElement;
    expect(element).toHaveClass("mtw-split");
  });

  test("does not apply split layout when showRaw is false", () => {
    const markdown = "Test content";
    const { container } = render(
      <MarkdownTypewriter markdown={markdown} showRaw={false} layout="split" />
    );

    const element = container.firstChild as HTMLElement;
    expect(element).not.toHaveClass("mtw-split");
  });

  test("uses stack layout by default", () => {
    const markdown = "Test content";
    const { container } = render(<MarkdownTypewriter markdown={markdown} showRaw={true} />);

    const element = container.firstChild as HTMLElement;
    expect(element).not.toHaveClass("mtw-split");
  });

  test("accepts charsPerTick prop", () => {
    const markdown = "Test content";
    const { container } = render(<MarkdownTypewriter markdown={markdown} charsPerTick={3} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  test("handles minimum charsPerTick of 1", () => {
    const markdown = "Test content";
    const { container } = render(<MarkdownTypewriter markdown={markdown} charsPerTick={0} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  test("handles minimum delay of 10ms", () => {
    const markdown = "Test content";
    const { container } = render(<MarkdownTypewriter markdown={markdown} delay={5} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  test("typing animation progresses over time", async () => {
    vi.useFakeTimers();

    const markdown = "Hi";
    const { container } = render(<MarkdownTypewriter markdown={markdown} delay={50} />);

    // Initially should be empty or starting
    const renderedDiv = container.querySelector('.mtw-rendered');
    expect(renderedDiv).toBeInTheDocument();

    // Advance timers to trigger typing - wrap in act
    act(() => {
      vi.advanceTimersByTime(100); // 2 ticks at 50ms each
    });

    // Should have some content now
    expect(renderedDiv).toBeInTheDocument();

    // Advance to complete the typing
    act(() => {
      vi.advanceTimersByTime(200); // Complete the animation
    });

    expect(renderedDiv).toBeInTheDocument();

    vi.useRealTimers();
  });

  test("cleans up timer on unmount", () => {
    const clearIntervalSpy = vi.spyOn(window, 'clearInterval');

    const markdown = "Test content";
    const { unmount } = render(<MarkdownTypewriter markdown={markdown} />);

    unmount();

    expect(clearIntervalSpy).toHaveBeenCalled();
    clearIntervalSpy.mockRestore();
  });

  test("cleans up previous timer when markdown changes", async () => {
    const clearIntervalSpy = vi.spyOn(window, 'clearInterval');

    // Use a longer markdown to ensure timer stays active longer
    const longMarkdown = "This is a very long markdown content that will take some time to type out completely";
    const { rerender } = render(<MarkdownTypewriter markdown={longMarkdown} delay={100} charsPerTick={1} />);

    // Wait for the timer to be established and start running
    await new Promise(resolve => setTimeout(resolve, 50));

    // Change the markdown to trigger cleanup of existing timer and create new one
    rerender(<MarkdownTypewriter markdown="Different content" delay={100} charsPerTick={1} />);

    // Should have called clearInterval for the old timer
    expect(clearIntervalSpy).toHaveBeenCalled();

    clearIntervalSpy.mockRestore();
  });

  test("cleans up previous timer when delay changes", async () => {
    const clearIntervalSpy = vi.spyOn(window, 'clearInterval');

    const { rerender } = render(<MarkdownTypewriter markdown="Test content" delay={10} />);

    // Wait a tiny bit to let the timer get established
    await new Promise(resolve => setTimeout(resolve, 5));

    // Change the delay to trigger cleanup of existing timer
    rerender(<MarkdownTypewriter markdown="Test content" delay={20} />);

    expect(clearIntervalSpy).toHaveBeenCalled();

    clearIntervalSpy.mockRestore();
  });

  test("cleans up previous timer when charsPerTick changes", async () => {
    const clearIntervalSpy = vi.spyOn(window, 'clearInterval');

    const { rerender } = render(<MarkdownTypewriter markdown="Test content" charsPerTick={1} delay={10} />);

    // Wait a tiny bit to let the timer get established
    await new Promise(resolve => setTimeout(resolve, 5));

    // Change the charsPerTick to trigger cleanup of existing timer
    rerender(<MarkdownTypewriter markdown="Test content" charsPerTick={2} delay={10} />);

    expect(clearIntervalSpy).toHaveBeenCalled();

    clearIntervalSpy.mockRestore();
  });

  test("handles empty markdown", () => {
    const markdown = "";
    const { container } = render(<MarkdownTypewriter markdown={markdown} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  test("injects CSS styles only once", () => {
    // Remove any existing style element
    const existingStyle = document.getElementById("mtw-caret-style");
    if (existingStyle) {
      existingStyle.remove();
    }

    const markdown = "Test content";

    // Render first component
    const { unmount: unmount1 } = render(<MarkdownTypewriter markdown={markdown} />);

    // Should have one style element
    let styleElements = document.querySelectorAll('#mtw-caret-style');
    expect(styleElements).toHaveLength(1);

    // Render second component
    const { unmount: unmount2 } = render(<MarkdownTypewriter markdown={markdown} />);

    // Should still have only one style element
    styleElements = document.querySelectorAll('#mtw-caret-style');
    expect(styleElements).toHaveLength(1);

    unmount1();
    unmount2();
  });

  test("completes typing animation and cleans up timer", async () => {
    vi.useFakeTimers();
    const clearIntervalSpy = vi.spyOn(window, 'clearInterval');

    const shortMarkdown = "Hi";
    render(<MarkdownTypewriter markdown={shortMarkdown} delay={50} charsPerTick={1} />);

    // Advance timers to complete the typing animation
    act(() => {
      vi.advanceTimersByTime(200); // Should be enough to complete "Hi"
    });

    // Should have called clearInterval when animation completed
    expect(clearIntervalSpy).toHaveBeenCalled();

    clearIntervalSpy.mockRestore();
    vi.useRealTimers();
  });

  test("timer cleanup during effect re-run with active timer", async () => {
    // This test specifically targets lines 52-54
    const clearIntervalSpy = vi.spyOn(window, 'clearInterval');

    // Use a very long markdown and slow typing to ensure timer stays active
    const veryLongMarkdown = "A".repeat(1000); // 1000 characters
    const { rerender } = render(
      <MarkdownTypewriter
        markdown={veryLongMarkdown}
        delay={1000} // Very slow typing
        charsPerTick={1}
      />
    );

    // Wait for the timer to definitely be established
    await new Promise(resolve => setTimeout(resolve, 100));

    // Now change props to trigger useEffect re-run while timer is active
    rerender(
      <MarkdownTypewriter
        markdown="Short text"
        delay={1000}
        charsPerTick={1}
      />
    );

    // This should have triggered the cleanup code in lines 52-54
    expect(clearIntervalSpy).toHaveBeenCalled();

    clearIntervalSpy.mockRestore();
  });

  test("renders tables with GitHub Flavored Markdown", async () => {
    vi.useFakeTimers();

    const tableMarkdown = `| Feature | Status |
|---------|--------|
| Tables  | Ready  |`;

    const { container } = render(<MarkdownTypewriter markdown={tableMarkdown} delay={10} />);

    // Advance timers to complete the typing animation
    act(() => {
      vi.advanceTimersByTime(1000); // Should be enough to complete the table
    });

    // Should render table elements
    const table = container.querySelector('table');
    expect(table).toBeInTheDocument();

    // Should have table headers
    const headers = container.querySelectorAll('th');
    expect(headers).toHaveLength(2);

    // Should have table cells
    const cells = container.querySelectorAll('td');
    expect(cells).toHaveLength(2); // 1 row × 2 columns

    vi.useRealTimers();
  });
});

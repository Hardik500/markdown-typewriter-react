import React from "react";
import { render } from "@testing-library/react";
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
    expect(element).toHaveStyle("color: red");
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
});

import { useId, useState } from "react";
import { createRoot } from "react-dom/client";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import MarkdownTypewriter from "../src/index";

// Preset markdown examples
const presetExamples = {
  welcome: `# Welcome to Markdown Typewriter React

This is a **React component** that renders markdown with a smooth typewriter animation effect.

## Features

- 🎯 **Simple API** - Just pass markdown content
- ⚡ **Lightweight** - Minimal dependencies
- 🎨 **Customizable** - Configurable typing speed
- 📱 **Responsive** - Works on all screen sizes
- 🔧 **TypeScript** - Full TypeScript support

*Enjoy using Markdown Typewriter React!*`,

  codeExample: `# Code Examples

Here's how to use JavaScript:

\`\`\`javascript
import React from 'react';
import MarkdownTypewriter from 'markdown-typewriter-react';

const App = () => {
  const markdown = "# Hello, World!";
  return <MarkdownTypewriter markdown={markdown} delay={50} />;
};

export default App;
\`\`\`

And here's some Python:

\`\`\`python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(10))
\`\`\``,

  formatting: `# Text Formatting Demo

## Basic Formatting

This text demonstrates **bold**, *italic*, and \`inline code\` formatting.

You can also combine ***bold and italic*** text.

## Blockquotes

> This is a blockquote with some important information.
>
> It can span multiple lines and contain **formatted text**.

## Links and Images

Check out the [GitHub repository](https://github.com/Hardik500/markdown-typewriter-react) for more information.

---

*That's all for now!*`,

  lists: `# Lists and Tables

## Unordered Lists

- First item with **bold text**
- Second item with *italic text*
- Third item with \`inline code\`
  - Nested item 1
  - Nested item 2
    - Deeply nested item

## Ordered Lists

1. First step
2. Second step
3. Third step
   1. Sub-step A
   2. Sub-step B

## Task Lists

- [x] Completed task
- [x] Another completed task
- [ ] Pending task
- [ ] Another pending task

## Tables

| Feature | Description | Status |
|---------|-------------|--------|
| Typewriter Effect | Smooth character-by-character typing | ✅ |
| Markdown Support | Full markdown rendering | ✅ |
| Customizable Speed | Adjustable typing delay | ✅ |
| TypeScript | Full type definitions | ✅ |`,
};

// Styles
const styles = {
  container: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    lineHeight: "1.6",
    color: "#333",
    backgroundColor: "#f8fafc",
    minHeight: "100vh",
    margin: 0,
    padding: 0,
  },
  header: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    padding: "3rem 2rem",
    textAlign: "center" as const,
    marginBottom: "2rem",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    margin: "0 0 1rem 0",
    textShadow: "0 2px 4px rgba(0,0,0,0.3)",
  },
  subtitle: {
    fontSize: "1.2rem",
    opacity: 0.9,
    margin: "0 0 2rem 0",
    maxWidth: "600px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  githubLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    color: "white",
    textDecoration: "none",
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: "0.75rem 1.5rem",
    borderRadius: "50px",
    border: "2px solid rgba(255,255,255,0.3)",
    transition: "all 0.3s ease",
    fontSize: "1rem",
    fontWeight: "500",
  },
  content: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 2rem 4rem 2rem",
  },
  section: {
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "2rem",
    marginBottom: "2rem",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)",
    border: "1px solid #e2e8f0",
  },
  sectionTitle: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#2d3748",
    marginBottom: "1rem",
    borderBottom: "2px solid #e2e8f0",
    paddingBottom: "0.5rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "2rem",
    marginBottom: "2rem",
  },
  card: {
    backgroundColor: "#f7fafc",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    padding: "1.5rem",
  },
  cardTitle: {
    fontSize: "1.1rem",
    fontWeight: "600",
    color: "#2d3748",
    marginBottom: "1rem",
  },
  controlsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "1rem",
    marginBottom: "1.5rem",
  },
  control: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "0.5rem",
  },
  label: {
    fontSize: "0.9rem",
    fontWeight: "500",
    color: "#4a5568",
  },
  input: {
    padding: "0.5rem",
    border: "1px solid #cbd5e0",
    borderRadius: "4px",
    fontSize: "0.9rem",
  },
  slider: {
    width: "100%",
    height: "6px",
    borderRadius: "3px",
    background: "#e2e8f0",
    outline: "none",
  },
  presetButton: {
    padding: "0.5rem 1rem",
    backgroundColor: "#4299e1",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "0.9rem",
    fontWeight: "500",
    transition: "all 0.2s ease",
  },
  presetButtonActive: {
    backgroundColor: "#2b6cb0",
  },
  demoArea: {
    backgroundColor: "white",
    border: "2px solid #e2e8f0",
    borderRadius: "12px",
    padding: "2rem",
    minHeight: "400px",
    position: "relative" as const,
    overflow: "hidden",
  },
  codeBlock: {
    backgroundColor: "#1a202c",
    borderRadius: "8px",
    padding: "1rem",
    marginBottom: "1rem",
    position: "relative" as const,
  },
  copyButton: {
    position: "absolute" as const,
    top: "0.5rem",
    right: "0.5rem",
    padding: "0.25rem 0.5rem",
    backgroundColor: "#4a5568",
    color: "white",
    border: "none",
    borderRadius: "4px",
    fontSize: "0.75rem",
    cursor: "pointer",
    opacity: 0.7,
    transition: "opacity 0.2s ease",
  },
  installCode: {
    backgroundColor: "#f7fafc",
    border: "1px solid #e2e8f0",
    borderRadius: "6px",
    padding: "1rem",
    fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
    fontSize: "0.9rem",
    color: "#2d3748",
    marginBottom: "1rem",
  },
  propsTable: {
    width: "100%",
    borderCollapse: "collapse" as const,
    marginTop: "1rem",
  },
  tableHeader: {
    backgroundColor: "#f7fafc",
    padding: "0.75rem",
    textAlign: "left" as const,
    fontWeight: "600",
    borderBottom: "2px solid #e2e8f0",
  },
  tableCell: {
    padding: "0.75rem",
    borderBottom: "1px solid #e2e8f0",
    verticalAlign: "top" as const,
  },
  badge: {
    display: "inline-block",
    padding: "0.25rem 0.5rem",
    backgroundColor: "#e2e8f0",
    color: "#4a5568",
    borderRadius: "4px",
    fontSize: "0.75rem",
    fontWeight: "500",
    fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
  },
};

const App = () => {
  const delayId = useId();
  const charsId = useId();
  const layoutId = useId();

  const [delay, setDelay] = useState(75);
  const [charsPerTick, setCharsPerTick] = useState(1);
  const [showRaw, setShowRaw] = useState(false);
  const [layout, setLayout] = useState<"stack" | "split">("split");
  const [selectedPreset, setSelectedPreset] = useState("welcome");
  const [customMarkdown, setCustomMarkdown] = useState(presetExamples.welcome);
  const [copiedCode, setCopiedCode] = useState("");

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCode(id);
      setTimeout(() => setCopiedCode(""), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const handlePresetChange = (presetKey: string) => {
    setSelectedPreset(presetKey);
    setCustomMarkdown(presetExamples[presetKey as keyof typeof presetExamples]);
  };

  const currentCode = `import React from 'react';
import MarkdownTypewriter from 'markdown-typewriter-react';

const App = () => {
  return (
    <MarkdownTypewriter
      markdown={\`${customMarkdown.slice(0, 100)}...\`}
      delay={${delay}}
      charsPerTick={${charsPerTick}}
      showRaw={${showRaw}}
      layout="${layout}"
    />
  );
};`;

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <h1 style={styles.title}>Markdown Typewriter React</h1>
        <p style={styles.subtitle}>
          A React component that renders markdown with a smooth, natural typewriter animation. Watch
          as raw markdown is typed character-by-character and rendered in real-time.
        </p>
        <a
          href="https://github.com/Hardik500/markdown-typewriter-react"
          target="_blank"
          rel="noopener noreferrer"
          style={styles.githubLink}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.3)";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.2)";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          <span>⭐</span> View on GitHub
        </a>
      </header>

      <div style={styles.content}>
        {/* Installation */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>🚀 Installation</h2>
          <div style={styles.installCode}>npm install markdown-typewriter-react</div>
          <div style={styles.installCode}>yarn add markdown-typewriter-react</div>
        </section>

        {/* Controls */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>⚙️ Interactive Controls</h2>
          <div style={styles.controlsGrid}>
            <div style={styles.control}>
              <label style={styles.label} htmlFor={delayId}>
                Typing Delay: {delay}ms
              </label>
              <input
                id={delayId}
                type="range"
                min="10"
                max="200"
                value={delay}
                onChange={(e) => setDelay(Number(e.target.value))}
                style={styles.slider}
                title="Controls how fast characters are typed"
              />
            </div>
            <div style={styles.control}>
              <label style={styles.label} htmlFor={charsId}>
                Characters per Tick: {charsPerTick}
              </label>
              <input
                id={charsId}
                type="range"
                min="1"
                max="10"
                value={charsPerTick}
                onChange={(e) => setCharsPerTick(Number(e.target.value))}
                style={styles.slider}
                title="How many characters to type at once"
              />
            </div>
            <div style={styles.control}>
              <label style={styles.label}>
                <input
                  type="checkbox"
                  checked={showRaw}
                  onChange={(e) => setShowRaw(e.target.checked)}
                  style={{ marginRight: "0.5rem" }}
                />
                Show Raw Typing
              </label>
            </div>
            <div style={styles.control}>
              <label style={styles.label} htmlFor={layoutId}>
                Layout
              </label>
              <select
                id={layoutId}
                value={layout}
                onChange={(e) => setLayout(e.target.value as "stack" | "split")}
                style={styles.input}
              >
                <option value="stack">Stack</option>
                <option value="split">Split</option>
              </select>
            </div>
          </div>
        </section>

        {/* Preset Examples */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>📝 Example Templates</h2>
          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem", flexWrap: "wrap" }}>
            {Object.entries(presetExamples).map(([key, _]) => (
              <button
                key={key}
                type="button"
                onClick={() => handlePresetChange(key)}
                style={{
                  ...styles.presetButton,
                  ...(selectedPreset === key ? styles.presetButtonActive : {}),
                }}
                onMouseEnter={(e) => {
                  if (selectedPreset !== key) {
                    e.currentTarget.style.backgroundColor = "#3182ce";
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedPreset !== key) {
                    e.currentTarget.style.backgroundColor = "#4299e1";
                  }
                }}
              >
                {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1")}
              </button>
            ))}
          </div>
          <textarea
            value={customMarkdown}
            onChange={(e) => setCustomMarkdown(e.target.value)}
            style={{
              width: "100%",
              height: "150px",
              padding: "1rem",
              border: "1px solid #cbd5e0",
              borderRadius: "8px",
              fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
              fontSize: "0.9rem",
              lineHeight: "1.5",
              resize: "vertical" as const,
            }}
            placeholder="Edit the markdown content here..."
          />
        </section>

        {/* Live Demo */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>✨ Live Demo</h2>
          <div style={styles.demoArea}>
            <MarkdownTypewriter
              markdown={customMarkdown}
              delay={delay}
              charsPerTick={charsPerTick}
              showRaw={showRaw}
              layout={layout}
              style={{
                fontFamily: "system-ui, -apple-system, sans-serif",
                lineHeight: "1.6",
                fontSize: "1rem",
              }}
            />
          </div>
        </section>

        {/* Code Example */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>💻 Current Code</h2>
          <p style={{ color: "#4a5568", marginBottom: "1rem" }}>
            This is the React code that generates the demo above with your current settings:
          </p>
          <div style={styles.codeBlock}>
            <button
              type="button"
              style={{
                ...styles.copyButton,
                opacity: copiedCode === "current" ? 1 : 0.7,
              }}
              onClick={() => copyToClipboard(currentCode, "current")}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "1";
              }}
              onMouseLeave={(e) => {
                if (copiedCode !== "current") e.currentTarget.style.opacity = "0.7";
              }}
            >
              {copiedCode === "current" ? "✓ Copied!" : "Copy"}
            </button>
            <SyntaxHighlighter
              language="tsx"
              style={tomorrow}
              customStyle={{
                margin: 0,
                backgroundColor: "transparent",
                fontSize: "0.85rem",
              }}
            >
              {currentCode}
            </SyntaxHighlighter>
          </div>
        </section>

        {/* Props Documentation */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>📚 Props Documentation</h2>
          <table style={styles.propsTable}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>Prop</th>
                <th style={styles.tableHeader}>Type</th>
                <th style={styles.tableHeader}>Default</th>
                <th style={styles.tableHeader}>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={styles.tableCell}>
                  <span style={styles.badge}>markdown</span>
                </td>
                <td style={styles.tableCell}>string</td>
                <td style={styles.tableCell}>-</td>
                <td style={styles.tableCell}>
                  <strong>Required.</strong> The markdown content to render with typewriter effect
                </td>
              </tr>
              <tr>
                <td style={styles.tableCell}>
                  <span style={styles.badge}>delay</span>
                </td>
                <td style={styles.tableCell}>number</td>
                <td style={styles.tableCell}>75</td>
                <td style={styles.tableCell}>Typing delay per tick in milliseconds</td>
              </tr>
              <tr>
                <td style={styles.tableCell}>
                  <span style={styles.badge}>charsPerTick</span>
                </td>
                <td style={styles.tableCell}>number</td>
                <td style={styles.tableCell}>1</td>
                <td style={styles.tableCell}>How many characters to reveal per tick (≥ 1)</td>
              </tr>
              <tr>
                <td style={styles.tableCell}>
                  <span style={styles.badge}>showRaw</span>
                </td>
                <td style={styles.tableCell}>boolean</td>
                <td style={styles.tableCell}>false</td>
                <td style={styles.tableCell}>
                  Also show the raw markdown being typed with a caret
                </td>
              </tr>
              <tr>
                <td style={styles.tableCell}>
                  <span style={styles.badge}>layout</span>
                </td>
                <td style={styles.tableCell}>'stack' | 'split'</td>
                <td style={styles.tableCell}>'stack'</td>
                <td style={styles.tableCell}>
                  Layout when showRaw is true. 'split' shows raw and rendered side-by-side
                </td>
              </tr>
              <tr>
                <td style={styles.tableCell}>
                  <span style={styles.badge}>className</span>
                </td>
                <td style={styles.tableCell}>string</td>
                <td style={styles.tableCell}>-</td>
                <td style={styles.tableCell}>Additional CSS class name</td>
              </tr>
              <tr>
                <td style={styles.tableCell}>
                  <span style={styles.badge}>style</span>
                </td>
                <td style={styles.tableCell}>React.CSSProperties</td>
                <td style={styles.tableCell}>-</td>
                <td style={styles.tableCell}>Inline styles for the component</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Basic Usage */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>🎯 Basic Usage</h2>
          <div style={styles.codeBlock}>
            <button
              type="button"
              style={{
                ...styles.copyButton,
                opacity: copiedCode === "basic" ? 1 : 0.7,
              }}
              onClick={() =>
                copyToClipboard(
                  `import React from 'react';
import MarkdownTypewriter from 'markdown-typewriter-react';

const App = () => {
  const markdown = \`# Hello, World!

This is **markdown** with a *typewriter* effect.\`;

  return <MarkdownTypewriter markdown={markdown} />;
};

export default App;`,
                  "basic",
                )
              }
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "1";
              }}
              onMouseLeave={(e) => {
                if (copiedCode !== "basic") e.currentTarget.style.opacity = "0.7";
              }}
            >
              {copiedCode === "basic" ? "✓ Copied!" : "Copy"}
            </button>
            <SyntaxHighlighter
              language="tsx"
              style={tomorrow}
              customStyle={{
                margin: 0,
                backgroundColor: "transparent",
                fontSize: "0.85rem",
              }}
            >
              {`import React from 'react';
import MarkdownTypewriter from 'markdown-typewriter-react';

const App = () => {
  const markdown = \`# Hello, World!

This is **markdown** with a *typewriter* effect.\`;

  return <MarkdownTypewriter markdown={markdown} />;
};

export default App;`}
            </SyntaxHighlighter>
          </div>
        </section>
      </div>
    </div>
  );
};

const appElement = document.getElementById("app");
if (appElement) {
  createRoot(appElement).render(<App />);
}

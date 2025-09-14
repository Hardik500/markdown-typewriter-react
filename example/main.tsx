import React, { useState } from "react";
import ReactDOM from "react-dom";
import MarkdownTypewriter from "../src/index";

const markdown = `# Welcome to Markdown Typewriter React

This is a **React component** that renders markdown with a smooth typewriter animation effect.

## Features

- 🎯 **Simple API** - Just pass markdown content
- ⚡ **Lightweight** - Minimal dependencies
- 🎨 **Customizable** - Configurable typing speed
- 📱 **Responsive** - Works on all screen sizes
- 🔧 **TypeScript** - Full TypeScript support

## Code Example

Here's a code block with syntax highlighting:

\`\`\`javascript
import React from 'react';
import MarkdownTypewriter from 'markdown-typewriter-react';

const App = () => {
  const markdown = "# Hello, World!";
  return <MarkdownTypewriter markdown={markdown} />;
};
\`\`\`

## Lists

### Unordered List
- First item
- Second item
- Third item

### Ordered List
1. First step
2. Second step
3. Third step

## Text Formatting

This text has **bold**, *italic*, and \`inline code\` formatting.

> This is a blockquote with some important information.

---

*Enjoy using Markdown Typewriter React!*
`;

const App = () => {
  const [delay, setDelay] = useState(75);
  const [customMarkdown, setCustomMarkdown] = useState(markdown);

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Markdown Typewriter React - Demo</h1>

      <div style={{ marginBottom: "20px" }}>
        <label>
          Typing Delay (ms):
          <input
            type="range"
            min="10"
            max="200"
            value={delay}
            onChange={(e) => setDelay(Number(e.target.value))}
            style={{ margin: "0 10px" }}
          />
          {delay}ms
        </label>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label>
          Custom Markdown:
          <textarea
            value={customMarkdown}
            onChange={(e) => setCustomMarkdown(e.target.value)}
            style={{
              width: "100%",
              height: "100px",
              marginTop: "10px",
              fontFamily: "monospace",
            }}
          />
        </label>
      </div>

      <div
        style={{
          border: "1px solid #ddd",
          padding: "20px",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <MarkdownTypewriter
          markdown={customMarkdown}
          delay={delay}
          style={{
            fontFamily: "Monaco, Menlo, Ubuntu Mono, monospace",
            lineHeight: "1.6",
          }}
        />
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));

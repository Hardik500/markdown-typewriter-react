import type React from "react";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

interface MarkdownTypewriterProps {
  /** The markdown content to render */
  markdown: string;
  /** Typing delay in milliseconds */
  delay?: number;
  /** Additional CSS class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Whether to show the raw typed markdown with a caret */
  showRaw?: boolean;
}

const MarkdownTypewriter: React.FC<MarkdownTypewriterProps> = ({
  markdown,
  delay = 75,
  className = "",
  style,
  showRaw = false,
}) => {
  const [typed, setTyped] = useState("");
  const timerRef = useRef<number | null>(null);

  // Inject caret CSS once
  useEffect(() => {
    if (document.getElementById("mtw-caret-style")) return;
    const styleEl = document.createElement("style");
    styleEl.id = "mtw-caret-style";
    styleEl.textContent = `
      .markdown-typewriter .mtw-raw { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; white-space: pre-wrap; }
      .markdown-typewriter .mtw-caret { display: inline-block; width: 0; border-right: 2px solid currentColor; margin-left: 2px; animation: mtw-blink 1s steps(1,end) infinite; }
      @keyframes mtw-blink { 50% { border-color: transparent; } }
    `;
    document.head.appendChild(styleEl);
  }, []);

  // Typing loop over raw markdown
  useEffect(() => {
    // reset
    setTyped("");
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    let i = 0;
    timerRef.current = window.setInterval(
      () => {
        i += 1;
        setTyped(markdown.slice(0, i));
        if (i >= markdown.length && timerRef.current) {
          window.clearInterval(timerRef.current);
          timerRef.current = null;
        }
      },
      Math.max(10, delay),
    );
    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [markdown, delay]);

  return (
    <div className={`markdown-typewriter ${className}`.trim()} style={style}>
      {showRaw && (
        <pre className="mtw-raw">
          <code>{typed}</code>
          <span className="mtw-caret" />
        </pre>
      )}
      <div className="mtw-rendered">
        <ReactMarkdown>{typed}</ReactMarkdown>
      </div>
    </div>
  );
};

export default MarkdownTypewriter;

import type React from "react";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownTypewriterProps {
  /** The markdown content to render */
  markdown: string;
  /** Typing delay in milliseconds */
  delay?: number;
  /** Number of characters to type per tick (>=1) */
  charsPerTick?: number;
  /** Layout when showing raw + rendered */
  layout?: "stack" | "split";
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
  charsPerTick = 1,
  layout = "stack",
  className = "",
  style,
  showRaw = false,
}) => {
  const [typed, setTyped] = useState("");
  const timerRef = useRef<number | null>(null);

  // Inject caret/layout CSS once
  useEffect(() => {
    if (document.getElementById("mtw-caret-style")) return;
    const styleEl = document.createElement("style");
    styleEl.id = "mtw-caret-style";
    styleEl.textContent = `
      .markdown-typewriter .mtw-raw { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; white-space: pre-wrap; }
      .markdown-typewriter .mtw-caret { display: inline-block; width: 0; border-right: 2px solid currentColor; margin-left: 2px; animation: mtw-blink 1s steps(1,end) infinite; }
      .markdown-typewriter.mtw-split .mtw-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; align-items: start; }
      .markdown-typewriter table { border-collapse: collapse; width: 100%; margin: 16px 0; }
      .markdown-typewriter th, .markdown-typewriter td { border: 1px solid #ddd; padding: 8px 12px; text-align: left; }
      .markdown-typewriter th { background-color: #f5f5f5; font-weight: 600; }
      .markdown-typewriter tr:nth-child(even) { background-color: #f9f9f9; }
      @keyframes mtw-blink { 50% { border-color: transparent; } }
    `;
    document.head.appendChild(styleEl);
  }, []);

  // Typing loop over raw markdown
  useEffect(() => {
    setTyped("");
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    let i = 0;
    const step = Math.max(1, Math.floor(charsPerTick));
    timerRef.current = window.setInterval(
      () => {
        i = Math.min(markdown.length, i + step);
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
  }, [markdown, delay, charsPerTick]);

  const split = showRaw && layout === "split";

  return (
    <div
      className={`markdown-typewriter ${split ? "mtw-split" : ""} ${className}`.trim()}
      style={style}
    >
      <div className="mtw-grid">
        {showRaw && (
          <pre className="mtw-raw">
            <code>{typed}</code>
            <span className="mtw-caret" />
          </pre>
        )}
        <div className="mtw-rendered">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{typed}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default MarkdownTypewriter;

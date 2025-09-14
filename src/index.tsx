import React, { useEffect, useRef } from "react";
import Typewriter from "typewriter-effect/dist/core";
import { marked } from "marked";

interface MarkdownTypewriterProps {
  /** The markdown content to render */
  markdown: string;
  /** Typing delay in milliseconds */
  delay?: number;
  /** Additional CSS class name */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
}

const MarkdownTypewriter: React.FC<MarkdownTypewriterProps> = ({
  markdown,
  delay = 75,
  className = "",
  style,
}) => {
  const typewriterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typewriterRef.current) {
      const html = marked(markdown);
      const typewriter = new Typewriter(typewriterRef.current, {
        delay,
      });

      typewriter.typeString(html as string).start();
    }
  }, [markdown, delay]);

  return (
    <div ref={typewriterRef} className={`markdown-typewriter ${className}`.trim()} style={style} />
  );
};

export default MarkdownTypewriter;

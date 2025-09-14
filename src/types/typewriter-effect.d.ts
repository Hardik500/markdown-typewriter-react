declare module "typewriter-effect/dist/core" {
  interface TypewriterOptions {
    delay?: number;
    strings?: string[];
    autoStart?: boolean;
    loop?: boolean;
    deleteSpeed?: number;
    pauseFor?: number;
    cursor?: string;
    wrapperClassName?: string;
    cursorClassName?: string;
    stringSplitter?: (str: string) => string[];
    onStringTyped?: (arrayPos: number) => void;
    onLastStringBackspaced?: () => void;
    onTypingEnd?: () => void;
    onRemoveCursor?: () => void;
  }

  class Typewriter {
    constructor(element: HTMLElement, options?: TypewriterOptions);
    typeString(str: string): Typewriter;
    pauseFor(ms: number): Typewriter;
    deleteAll(speed?: number): Typewriter;
    deleteChar(amount?: number): Typewriter;
    start(): void;
    stop(): void;
    pause(): void;
    resume(): void;
  }

  export default Typewriter;
}

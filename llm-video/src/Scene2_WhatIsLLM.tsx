import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const COLOR_BG = "#0a0a0f";
const COLOR_TEXT = "#e2e8f0";
const COLOR_HIGHLIGHT = "#6366f1";
const COLOR_HIGHLIGHT2 = "#22d3ee";

const FULL_TEXT = "A Large Language Model is a neural network trained on vast amounts of text data.";
const HIGHLIGHT_WORD = "neural network";
const HIGHLIGHT2 = "text data";

const Highlight: React.FC<{
  word: string;
  color: string;
  delay: number;
  durationInFrames: number;
}> = ({ word, color, delay, durationInFrames }) => {
  const frame = useCurrentFrame();

  const highlightProgress = spring({
    fps: 30,
    frame,
    config: { damping: 200 },
    delay,
    durationInFrames,
  });
  const scaleX = Math.max(0, Math.min(1, highlightProgress));

  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      <span
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: "50%",
          height: "1.1em",
          transform: `translateY(-50%) scaleX(${scaleX})`,
          transformOrigin: "left center",
          backgroundColor: color,
          borderRadius: "0.2em",
          zIndex: 0,
          opacity: 0.3,
        }}
      />
      <span style={{ position: "relative", zIndex: 1 }}>{word}</span>
    </span>
  );
};

export const Scene2_WhatIsLLM = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = spring({ fps, frame, config: { damping: 200 } });

  const highlightIndex = FULL_TEXT.indexOf(HIGHLIGHT_WORD);
  const highlight2Index = FULL_TEXT.indexOf(HIGHLIGHT2);

  const preText = highlightIndex >= 0 ? FULL_TEXT.slice(0, highlightIndex) : FULL_TEXT;
  const midText = highlightIndex >= 0 
    ? FULL_TEXT.slice(highlightIndex, highlightIndex + HIGHLIGHT_WORD.length) 
    : "";
  const postMidText = highlightIndex >= 0 && highlight2Index >= highlightIndex + HIGHLIGHT_WORD.length
    ? FULL_TEXT.slice(highlightIndex + HIGHLIGHT_WORD.length, highlight2Index)
    : "";

  const hasHighlight2 = highlight2Index >= 0;
  const preHighlight2 = hasHighlight2 ? FULL_TEXT.slice(highlightIndex + HIGHLIGHT_WORD.length, highlight2Index) : "";

  return (
    <AbsoluteFill style={{ backgroundColor: COLOR_BG, justifyContent: "center", alignItems: "center", padding: 80 }}>
      <div style={{ maxWidth: 1000 }}>
        <div
          style={{
            fontSize: 56,
            fontWeight: 600,
            color: COLOR_TEXT,
            lineHeight: 1.4,
            fontFamily: "system-ui, -apple-system, sans-serif",
            opacity,
          }}
        >
          {highlightIndex >= 0 ? (
            <>
              <span>{preText}</span>
              <Highlight
                word={HIGHLIGHT_WORD}
                color={COLOR_HIGHLIGHT}
                delay={30}
                durationInFrames={24}
              />
              {hasHighlight2 ? (
                <>
                  <span>{preHighlight2}</span>
                  <Highlight
                    word={HIGHLIGHT2}
                    color={COLOR_HIGHLIGHT2}
                    delay={60}
                    durationInFrames={24}
                  />
                </>
              ) : null}
            </>
          ) : (
            <span>{FULL_TEXT}</span>
          )}
        </div>
        <p
          style={{
            fontSize: 28,
            color: "#64748b",
            marginTop: 40,
            opacity: spring({ fps, frame: frame - 45, config: { damping: 200 } }),
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          They learn patterns in language to understand and generate text
        </p>
      </div>
    </AbsoluteFill>
  );
};

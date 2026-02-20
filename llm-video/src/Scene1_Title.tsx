import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

const COLOR_BG = "#0a0a0f";
const COLOR_TITLE = "#ffffff";
const COLOR_ACCENT = "#6366f1";

export const Scene1_Title = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = spring({ fps, frame, config: { damping: 200 } });
  const titleScale = interpolate(titleOpacity, [0, 1], [0.8, 1]);

  const subtitleOpacity = spring({ fps, frame: frame - 30, config: { damping: 200 } });

  return (
    <AbsoluteFill style={{ backgroundColor: COLOR_BG, justifyContent: "center", alignItems: "center" }}>
      <div style={{ textAlign: "center" }}>
        <h1
          style={{
            fontSize: 96,
            fontWeight: 800,
            color: COLOR_TITLE,
            margin: 0,
            opacity: titleOpacity,
            transform: `scale(${titleScale})`,
            fontFamily: "system-ui, -apple-system, sans-serif",
            letterSpacing: "-2px",
          }}
        >
          How LLMs Work
        </h1>
        <p
          style={{
            fontSize: 36,
            color: COLOR_ACCENT,
            marginTop: 24,
            opacity: subtitleOpacity,
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontWeight: 500,
          }}
        >
          Large Language Models Explained
        </p>
      </div>
    </AbsoluteFill>
  );
};

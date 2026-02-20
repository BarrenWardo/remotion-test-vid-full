import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

const COLOR_BG = "#0a0a0f";
const COLOR_TEXT = "#ffffff";
const COLOR_ACCENT = "#6366f1";
const COLOR_ACCENT2 = "#22d3ee";

const getTypedText = ({
  frame,
  fullText,
  charFrames,
}: {
  frame: number;
  fullText: string;
  charFrames: number;
}): string => {
  const typedChars = Math.min(fullText.length, Math.floor(frame / charFrames));
  return fullText.slice(0, typedChars);
};

export const Scene8_Conclusion = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const FULL_TEXT = "LLMs predict the next word, one token at a time.";
  const CHAR_FRAMES = 3;

  const typedText = getTypedText({
    frame,
    fullText: FULL_TEXT,
    charFrames: CHAR_FRAMES,
  });

  const cursorBlink = interpolate(
    frame % 20,
    [0, 10, 20],
    [1, 0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const boxOpacity = spring({ fps, frame: frame - 30, config: { damping: 200 } });

  return (
    <AbsoluteFill style={{ backgroundColor: COLOR_BG, justifyContent: "center", alignItems: "center" }}>
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            display: "inline-block",
            padding: "40px 80px",
            backgroundColor: "rgba(99, 102, 241, 0.15)",
            borderRadius: 24,
            border: `2px solid rgba(99, 102, 241, ${boxOpacity * 0.5})`,
            opacity: boxOpacity,
          }}
        >
          <h2
            style={{
              fontSize: 56,
              fontWeight: 800,
              color: COLOR_TEXT,
              margin: 0,
              fontFamily: "system-ui, -apple-system, sans-serif",
              letterSpacing: "-1px",
            }}
          >
            {typedText}
            <span style={{ opacity: cursorBlink }}>|</span>
          </h2>
        </div>

        <div style={{ marginTop: 50 }}>
          <p
            style={{
              fontSize: 28,
              color: COLOR_ACCENT2,
              opacity: spring({ fps, frame: frame - 90, config: { damping: 200 } }),
              fontFamily: "system-ui, -apple-system, sans-serif",
            }}
          >
            Repeat this billions of times → Claude, GPT, Gemini, and more!
          </p>
        </div>

        <div
          style={{
            marginTop: 60,
            display: "flex",
            gap: 24,
            justifyContent: "center",
            opacity: spring({ fps, frame: frame - 120, config: { damping: 200 } }),
          }}
        >
          {["GPT", "Claude", "Gemini", "Llama"].map((name, i) => (
            <div
              key={i}
              style={{
                padding: "12px 28px",
                backgroundColor: i === 0 ? COLOR_ACCENT : "rgba(255,255,255,0.1)",
                borderRadius: 30,
                fontSize: 20,
                color: "#fff",
                fontFamily: "system-ui, -apple-system, sans-serif",
                fontWeight: 600,
              }}
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

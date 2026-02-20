import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

const COLOR_BG = "#0a0a0f";
const COLOR_TEXT = "#e2e8f0";
const COLOR_TOKEN = "#6366f1";
const COLOR_ARROW = "#22d3ee";

const ORIGINAL_TEXT = "The cat sat on the mat";

export const Scene3_Tokenization = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const tokens = ["The", "cat", "sat", "on", "the", "mat"];

  const mainOpacity = spring({ fps, frame, config: { damping: 200 } });

  return (
    <AbsoluteFill style={{ backgroundColor: COLOR_BG, justifyContent: "center", alignItems: "center" }}>
      <div style={{ textAlign: "center" }}>
        <h2
          style={{
            fontSize: 42,
            fontWeight: 700,
            color: COLOR_TEXT,
            marginBottom: 60,
            opacity: mainOpacity,
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          Step 1: Tokenization
        </h2>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20 }}>
          <div>
            <p style={{ color: "#64748b", fontSize: 24, marginBottom: 20, fontFamily: "system-ui, -apple-system, sans-serif" }}>
              Input Text
            </p>
            <div style={{ fontSize: 36, color: COLOR_TEXT, fontFamily: "monospace" }}>
              {ORIGINAL_TEXT}
            </div>
          </div>

          <div style={{ 
            fontSize: 32, 
            color: COLOR_ARROW, 
            opacity: spring({ fps, frame: frame - 20, config: { damping: 200 } }),
            transform: `translateX(${interpolate(spring({ fps, frame: frame - 20, config: { damping: 200 } }), [0, 1], [-20, 0])}px)`
          }}>
            →
          </div>

          <div>
            <p style={{ color: "#64748b", fontSize: 24, marginBottom: 20, fontFamily: "system-ui, -apple-system, sans-serif" }}>
              Tokens
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              {tokens.map((token, i) => (
                <div
                  key={i}
                  style={{
                    padding: "12px 20px",
                    backgroundColor: COLOR_TOKEN,
                    borderRadius: 8,
                    fontSize: 28,
                    color: "#fff",
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    opacity: spring({ fps, frame: frame - 30 - i * 10, config: { damping: 200 } }),
                    transform: `scale(${spring({ fps, frame: frame - 30 - i * 10, config: { damping: 200 } })})`,
                  }}
                >
                  {token}
                </div>
              ))}
            </div>
          </div>
        </div>

        <p
          style={{
            fontSize: 24,
            color: "#64748b",
            marginTop: 50,
            opacity: spring({ fps, frame: frame - 60, config: { damping: 200 } }),
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          Text is split into small units called "tokens"
        </p>
      </div>
    </AbsoluteFill>
  );
};

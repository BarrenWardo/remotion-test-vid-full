import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

const COLOR_BG = "#0a0a0f";
const COLOR_TEXT = "#e2e8f0";
const COLOR_ACCENT = "#6366f1";
const COLOR_PROB = "#22d3ee";

const generateProbabilities = (frame: number) => {
  const base = Math.sin(frame * 0.1) * 0.3;
  return [
    { word: "cat", prob: 0.35 + base * 0.1 },
    { word: "dog", prob: 0.25 - base * 0.05 },
    { word: "mouse", prob: 0.15 + base * 0.02 },
    { word: "bird", prob: 0.12 - base * 0.03 },
    { word: "fish", prob: 0.08 + base * 0.01 },
    { word: "other", prob: 0.05 - base * 0.02 },
  ];
};

export const Scene7_Output = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const mainOpacity = spring({ fps, frame, config: { damping: 200 } });
  const probs = generateProbabilities(frame);

  const maxProb = Math.max(...probs.map(p => p.prob));

  return (
    <AbsoluteFill style={{ backgroundColor: COLOR_BG, justifyContent: "center", alignItems: "center" }}>
      <div style={{ textAlign: "center" }}>
        <h2
          style={{
            fontSize: 42,
            fontWeight: 700,
            color: COLOR_TEXT,
            marginBottom: 50,
            opacity: mainOpacity,
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          Step 4: Output Prediction
        </h2>

        <div
          style={{
            display: "inline-block",
            padding: "40px 60px",
            backgroundColor: "rgba(34, 211, 238, 0.08)",
            borderRadius: 24,
            border: "2px solid rgba(34, 211, 238, 0.2)",
            opacity: spring({ fps, frame: frame - 20, config: { damping: 200 } }),
          }}
        >
          <p style={{ color: "#64748b", fontSize: 24, marginBottom: 30, marginTop: 0, fontFamily: "system-ui, -apple-system, sans-serif" }}>
            Given "The cat sat on the", predict next word:
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "center" }}>
            {probs.map((item, i) => {
              const isTop = item.prob === maxProb;
              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 20,
                    opacity: spring({ fps, frame: frame - 30 - i * 8, config: { damping: 200 } }),
                  }}
                >
                  <span
                    style={{
                      color: isTop ? COLOR_PROB : "#64748b",
                      fontSize: 28,
                      width: 120,
                      textAlign: "right",
                      fontFamily: "system-ui, -apple-system, sans-serif",
                      fontWeight: isTop ? 700 : 400,
                    }}
                  >
                    {item.word}
                  </span>
                  <div
                    style={{
                      width: 300,
                      height: 36,
                      backgroundColor: "rgba(34, 211, 238, 0.1)",
                      borderRadius: 8,
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        width: `${item.prob * 100}%`,
                        height: "100%",
                        backgroundColor: isTop ? COLOR_PROB : "rgba(34, 211, 238, 0.3)",
                        borderRadius: 8,
                        transition: "width 0.1s",
                      }}
                    />
                  </div>
                  <span
                    style={{
                      color: isTop ? COLOR_PROB : "#64748b",
                      fontSize: 24,
                      width: 80,
                      textAlign: "left",
                      fontFamily: "system-ui, -apple-system, sans-serif",
                      fontWeight: isTop ? 700 : 400,
                    }}
                  >
                    {(item.prob * 100).toFixed(0)}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <p
          style={{
            fontSize: 28,
            color: COLOR_ACCENT,
            marginTop: 50,
            opacity: spring({ fps, frame: frame - 80, config: { damping: 200 } }),
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontWeight: 600,
          }}
        >
          "cat" has the highest probability!
        </p>
      </div>
    </AbsoluteFill>
  );
};

import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

const COLOR_BG = "#0a0a0f";
const COLOR_HIGHLIGHT = "#6366f1";
const COLOR_LINE = "#8b5cf6";

export const Scene6_Attention = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const mainOpacity = spring({ fps, frame, config: { damping: 200 } });

  const words = ["The", "cat", "sat", "on", "the", "mat"];
  const attentionWeights = [
    [0.9, 0.05, 0.02, 0.01, 0.01, 0.01],
    [0.05, 0.85, 0.05, 0.02, 0.02, 0.01],
    [0.02, 0.05, 0.75, 0.1, 0.05, 0.03],
    [0.01, 0.02, 0.1, 0.8, 0.05, 0.02],
    [0.01, 0.02, 0.05, 0.05, 0.85, 0.02],
    [0.01, 0.01, 0.03, 0.02, 0.02, 0.91],
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: COLOR_BG, justifyContent: "center", alignItems: "center" }}>
      <div style={{ textAlign: "center" }}>
        <h2
          style={{
            fontSize: 48,
            fontWeight: 800,
            color: "#e2e8f0",
            marginBottom: 20,
            opacity: mainOpacity,
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          Attention Mechanism
        </h2>

        <p
          style={{
            fontSize: 28,
            color: COLOR_HIGHLIGHT,
            marginBottom: 50,
            opacity: spring({ fps, frame: frame - 20, config: { damping: 200 } }),
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          "Attention is All You Need"
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 16,
            marginBottom: 30,
          }}
        >
          {words.map((word, i) => (
            <div
              key={i}
              style={{
                padding: "12px 20px",
                backgroundColor: "rgba(99, 102, 241, 0.2)",
                borderRadius: 8,
                fontSize: 24,
                color: "#fff",
                fontFamily: "system-ui, -apple-system, sans-serif",
                opacity: spring({ fps, frame: frame - 30 - i * 5, config: { damping: 200 } }),
                border: "1px solid rgba(99, 102, 241, 0.5)",
              }}
            >
              {word}
            </div>
          ))}
        </div>

        <div
          style={{
            display: "inline-block",
            padding: "30px 50px",
            backgroundColor: "rgba(139, 92, 246, 0.1)",
            borderRadius: 20,
            border: "1px solid rgba(139, 92, 246, 0.3)",
            opacity: spring({ fps, frame: frame - 50, config: { damping: 200 } }),
          }}
        >
          <p style={{ color: "#e2e8f0", fontSize: 22, margin: 0, marginBottom: 16, fontFamily: "system-ui, -apple-system, sans-serif" }}>
            How each word attends to other words:
          </p>
          
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {words.map((word, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  opacity: spring({ fps, frame: frame - 60 - i * 5, config: { damping: 200 } }),
                }}
              >
                <span style={{ color: "#fff", fontSize: 20, width: 60, fontFamily: "system-ui, -apple-system, sans-serif" }}>
                  {word}
                </span>
                <div style={{ display: "flex", gap: 4 }}>
                  {attentionWeights[i].map((weight, j) => (
                    <div
                      key={j}
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 4,
                        backgroundColor: `rgba(139, 92, 246, ${weight})`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 10,
                        color: weight > 0.3 ? "#fff" : "transparent",
                        fontFamily: "system-ui, -apple-system, sans-serif",
                      }}
                    >
                      {weight > 0.1 ? weight.toFixed(1) : ""}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <p
          style={{
            fontSize: 22,
            color: "#64748b",
            marginTop: 40,
            opacity: spring({ fps, frame: frame - 90, config: { damping: 200 } }),
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          The model learns which words are relevant to each other
        </p>
      </div>
    </AbsoluteFill>
  );
};

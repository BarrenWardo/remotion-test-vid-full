import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

const COLOR_BG = "#0a0a0f";
const COLOR_TOKEN = "#6366f1";
const COLOR_VECTOR = "#22d3ee";

const tokens = ["The", "cat", "sat", "on", "the", "mat"];

const generateVector = (seed: number) => {
  return Array.from({ length: 5 }, (_, i) => 
    (Math.sin(seed * i * 0.7) * 0.5 + 0.5).toFixed(2)
  );
};

export const Scene4_Embeddings = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const mainOpacity = spring({ fps, frame, config: { damping: 200 } });

  return (
    <AbsoluteFill style={{ backgroundColor: COLOR_BG, justifyContent: "center", alignItems: "center" }}>
      <div style={{ textAlign: "center" }}>
        <h2
          style={{
            fontSize: 42,
            fontWeight: 700,
            color: "#e2e8f0",
            marginBottom: 50,
            opacity: mainOpacity,
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          Step 2: Embeddings
        </h2>

        <div style={{ display: "flex", gap: 60, alignItems: "center", justifyContent: "center" }}>
          <div>
            <p style={{ color: "#64748b", fontSize: 24, marginBottom: 20, fontFamily: "system-ui, -apple-system, sans-serif" }}>
              Tokens
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {tokens.map((token, i) => (
                <div
                  key={i}
                  style={{
                    padding: "10px 24px",
                    backgroundColor: COLOR_TOKEN,
                    borderRadius: 8,
                    fontSize: 24,
                    color: "#fff",
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    opacity: spring({ fps, frame: frame - 20 - i * 8, config: { damping: 200 } }),
                  }}
                >
                  {token}
                </div>
              ))}
            </div>
          </div>

          <div style={{ 
            fontSize: 28, 
            color: COLOR_VECTOR,
            opacity: spring({ fps, frame: frame - 40, config: { damping: 200 } }),
          }}>
            →
          </div>

          <div>
            <p style={{ color: "#64748b", fontSize: 24, marginBottom: 20, fontFamily: "system-ui, -apple-system, sans-serif" }}>
              Numerical Vectors
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {tokens.map((token, i) => (
                <div
                  key={i}
                  style={{
                    padding: "10px 16px",
                    backgroundColor: "rgba(34, 211, 238, 0.15)",
                    borderRadius: 8,
                    fontSize: 18,
                    color: COLOR_VECTOR,
                    fontFamily: "monospace",
                    opacity: spring({ fps, frame: frame - 50 - i * 8, config: { damping: 200 } }),
                    border: "1px solid rgba(34, 211, 238, 0.3)",
                  }}
                >
                  [{generateVector(i).join(", ")}]
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
            opacity: spring({ fps, frame: frame - 80, config: { damping: 200 } }),
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          Each token becomes a list of numbers capturing its meaning
        </p>
      </div>
    </AbsoluteFill>
  );
};

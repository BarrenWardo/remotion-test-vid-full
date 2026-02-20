import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

const COLOR_BG = "#0a0a0f";
const COLOR_BOX = "#6366f1";
const COLOR_BOX2 = "#8b5cf6";
const COLOR_BOX3 = "#22d3ee";
const COLOR_ARROW = "#64748b";

const TokenBox: React.FC<{ children: React.ReactNode; delay: number; color: string }> = ({ 
  children, delay, color 
}) => {
  const frame = useCurrentFrame();
  
  return (
    <div
      style={{
        padding: "16px 28px",
        backgroundColor: color,
        borderRadius: 12,
        fontSize: 28,
        color: "#fff",
        fontFamily: "system-ui, -apple-system, sans-serif",
        opacity: spring({ fps: 30, frame: frame - delay, config: { damping: 200 } }),
        transform: `scale(${spring({ fps: 30, frame: frame - delay, config: { damping: 200 } })})`,
      }}
    >
      {children}
    </div>
  );
};

const Arrow: React.FC<{ delay: number }> = ({ delay }) => {
  const frame = useCurrentFrame();
  
  return (
    <span
      style={{
        fontSize: 32,
        color: COLOR_ARROW,
        opacity: spring({ fps: 30, frame: frame - delay, config: { damping: 200 } }),
      }}
    >
      →
    </span>
  );
};

export const Scene5_Transformer = () => {
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
          Step 3: The Transformer
        </h2>

        <div style={{ display: "flex", gap: 20, alignItems: "center", justifyContent: "center", flexWrap: "wrap" }}>
          <TokenBox delay={20} color={COLOR_BOX}>Input</TokenBox>
          <Arrow delay={30} />
          <TokenBox delay={40} color={COLOR_BOX2}>Encoder</TokenBox>
          <Arrow delay={50} />
          <TokenBox delay={60} color={COLOR_BOX3}>Attention</TokenBox>
          <Arrow delay={70} />
          <TokenBox delay={80} color={COLOR_BOX2}>Decoder</TokenBox>
          <Arrow delay={90} />
          <TokenBox delay={100} color={COLOR_BOX}>Output</TokenBox>
        </div>

        <div
          style={{
            marginTop: 50,
            padding: "24px 40px",
            backgroundColor: "rgba(139, 92, 246, 0.15)",
            borderRadius: 16,
            border: "1px solid rgba(139, 92, 246, 0.3)",
            opacity: spring({ fps, frame: frame - 70, config: { damping: 200 } }),
          }}
        >
          <p style={{ color: "#e2e8f0", fontSize: 26, margin: 0, fontFamily: "system-ui, -apple-system, sans-serif" }}>
            The Transformer processes all tokens
          </p>
          <p style={{ color: "#64748b", fontSize: 20, marginTop: 12, fontFamily: "system-ui, -apple-system, sans-serif" }}>
            simultaneously, learning relationships between words
          </p>
        </div>
      </div>
    </AbsoluteFill>
  );
};

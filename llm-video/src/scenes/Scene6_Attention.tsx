import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { GridBackground } from "../components/GridBackground";
import { GlowText } from "../components/GlowText";
import { COLORS, FONTS } from "../styles/colors";

const words = ["The", "cat", "sat", "on", "the", "mat"];

const attentionWeights = [
  [0.85, 0.08, 0.02, 0.02, 0.02, 0.01],
  [0.08, 0.80, 0.06, 0.02, 0.02, 0.02],
  [0.02, 0.06, 0.70, 0.12, 0.06, 0.04],
  [0.02, 0.02, 0.12, 0.75, 0.06, 0.03],
  [0.02, 0.02, 0.06, 0.06, 0.80, 0.04],
  [0.01, 0.02, 0.04, 0.03, 0.04, 0.86],
];

const MatrixCell: React.FC<{
  row: number;
  col: number;
  value: number;
}> = ({ row, col, value }) => {
  const frame = useCurrentFrame();
  const delay = 60 + row * 15 + col * 5;
  const adjustedFrame = Math.max(0, frame - delay);
  
  const opacity = spring({ fps: 30, frame: adjustedFrame, config: { damping: 200 } });
  const glowPulse = 0.5 + Math.sin(frame * 0.05) * 0.3;
  
  const intensity = value;
  const color = intensity > 0.5 ? COLORS.pink : intensity > 0.2 ? COLORS.purple : COLORS.cyan;
  
  return (
    <div
      style={{
        opacity,
        width: 36,
        height: 36,
        backgroundColor: `${color}${Math.floor(intensity * 255).toString(16).padStart(2, "0")}`,
        borderRadius: 4,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: intensity > 0.3 ? `0 0 ${8 * glowPulse}px ${color}` : "none",
        border: intensity > 0.5 ? `1px solid ${color}` : "none",
      }}
    >
      <span style={{ 
        color: intensity > 0.3 ? COLORS.white : COLORS.gray, 
        fontSize: 10,
        fontFamily: FONTS.mono,
      }}>
        {value > 0.1 ? value.toFixed(1) : ""}
      </span>
    </div>
  );
};

const WordBox: React.FC<{
  word: string;
  index: number;
  delay: number;
}> = ({ word, index, delay }) => {
  const frame = useCurrentFrame();
  const adjustedFrame = Math.max(0, frame - delay);
  
  const opacity = spring({ fps: 30, frame: adjustedFrame, config: { damping: 200 } });
  const scale = spring({ fps: 30, frame: adjustedFrame, config: { damping: 15, stiffness: 200 } });
  
  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale})`,
        padding: "12px 20px",
        backgroundColor: `${COLORS.cyan}20`,
        borderRadius: 8,
        border: `1px solid ${COLORS.cyan}50`,
        color: COLORS.white,
        fontSize: 20,
        fontFamily: FONTS.mono,
        fontWeight: 600,
      }}
    >
      {word}
    </div>
  );
};

const AttentionLine: React.FC<{
  fromIndex: number;
  toIndex: number;
  wordPositions: number[];
  delay: number;
}> = ({ fromIndex, toIndex, wordPositions, delay }) => {
  const frame = useCurrentFrame();
  const adjustedFrame = Math.max(0, frame - delay);
  
  const progress = spring({ fps: 30, frame: adjustedFrame, config: { damping: 200 } });
  
  const x1 = wordPositions[fromIndex];
  const x2 = wordPositions[toIndex];
  const midY = 350;
  const y1 = 150;
  const y2 = 150;
  
  const currentX = x1 + (x2 - x1) * progress;
  
  if (progress <= 0) return null;
  
  return (
    <svg
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    >
      <defs>
        <linearGradient id={`grad-${fromIndex}-${toIndex}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={COLORS.pink} stopOpacity="0" />
          <stop offset="50%" stopColor={COLORS.pink} stopOpacity="0.8" />
          <stop offset="100%" stopColor={COLORS.pink} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d={`M ${x1 + 30} ${y1 + 30} Q ${(x1 + x2) / 2} ${midY} ${x2 + 30} ${y2 + 30}`}
        stroke={COLORS.pink}
        strokeWidth={2}
        fill="none"
        strokeDasharray="5,5"
        style={{
          opacity: progress * 0.6,
        }}
      />
    </svg>
  );
};

export const Scene6_Attention = () => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  
  const titleOpacity = spring({ fps, frame, config: { damping: 200 } });
  const quoteOpacity = spring({ fps, frame: frame - 30, config: { damping: 200 } });
  const matrixOpacity = spring({ fps, frame: frame - 40, config: { damping: 200 } });
  
  const wordPositions = words.map((_, i) => 300 + i * 110);
  
  return (
    <AbsoluteFill>
      <GridBackground />
      
      <div style={{ position: "absolute", top: 40, left: 0, right: 0, textAlign: "center" }}>
        <GlowText size={44} color={COLORS.pink} delay={0} glowColor={COLORS.pink}>
          Attention Mechanism
        </GlowText>
      </div>
      
      <div style={{ position: "absolute", top: 100, left: 0, right: 0, textAlign: "center" }}>
        <span 
          style={{ 
            color: COLORS.purple, 
            fontSize: 28, 
            fontFamily: FONTS.body,
            fontStyle: "italic",
            opacity: quoteOpacity,
            textShadow: `0 0 10px ${COLORS.purple}`,
          }}
        >
          "Attention is All You Need"
        </span>
      </div>
      
      <div style={{ 
        position: "absolute", 
        top: 160, 
        left: 0, 
        right: 0, 
        display: "flex", 
        justifyContent: "center",
        gap: 8,
      }}>
        {words.map((word, i) => (
          <WordBox key={i} word={word} index={i} delay={20 + i * 10} />
        ))}
      </div>
      
      <AttentionLine 
        fromIndex={2} 
        toIndex={1} 
        wordPositions={wordPositions}
        delay={120}
      />
      
      <div style={{ 
        position: "absolute", 
        top: 400, 
        left: "50%", 
        transform: "translateX(-50%)",
        opacity: matrixOpacity,
      }}>
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <p style={{ color: COLORS.gray, fontSize: 18, margin: 0, fontFamily: FONTS.body }}>
            Attention Weights Matrix
          </p>
        </div>
        
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${words.length}, 36px)`, gap: 4 }}>
          {attentionWeights.map((row, i) => (
            row.map((value, j) => (
              <MatrixCell key={`${i}-${j}`} row={i} col={j} value={value} />
            ))
          ))}
        </div>
      </div>
      
      <div style={{ position: "absolute", bottom: 60, left: 0, right: 0, textAlign: "center" }}>
        <p style={{ color: COLORS.gray, fontSize: 20, fontFamily: FONTS.body, margin: 0 }}>
          The model learns which words are{' '}
          <span style={{ color: COLORS.pink, textShadow: `0 0 10px ${COLORS.pink}` }}>
            relevant
          </span>{' '}
          to each other
        </p>
      </div>
    </AbsoluteFill>
  );
};

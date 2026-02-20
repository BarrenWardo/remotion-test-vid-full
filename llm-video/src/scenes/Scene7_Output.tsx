import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig, Easing } from "remotion";
import { GridBackground } from "../components/GridBackground";
import { GlowText, Typewriter } from "../components/GlowText";
import { NeonCard } from "../components/NeonCard";
import { ParticleBurst } from "../components/ParticleStream";
import { COLORS, FONTS } from "../styles/colors";

const ProbabilityBar: React.FC<{
  word: string;
  probability: number;
  delay: number;
  isWinner?: boolean;
}> = ({ word, probability, delay, isWinner = false }) => {
  const frame = useCurrentFrame();
  const adjustedFrame = Math.max(0, frame - delay);
  
  const barProgress = interpolate(
    adjustedFrame,
    [0, 60],
    [0, probability],
    {
      easing: Easing.bezier(0.22, 1, 0.36, 1),
      extrapolateRight: "clamp",
    }
  );
  
  const labelOpacity = spring({ fps: 30, frame: adjustedFrame - 30, config: { damping: 200 } });
  const glowPulse = isWinner ? (0.5 + Math.sin(frame * 0.1) * 0.3) : 0;
  
  const barColor = isWinner ? COLORS.cyan : COLORS.purple;
  
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 20,
        marginBottom: 16,
      }}
    >
      <span
        style={{
          opacity: labelOpacity,
          color: isWinner ? COLORS.cyan : COLORS.white,
          fontSize: 28,
          fontFamily: FONTS.mono,
          fontWeight: isWinner ? 700 : 500,
          width: 120,
          textAlign: "right",
          textShadow: isWinner ? `0 0 10px ${COLORS.cyan}` : "none",
        }}
      >
        {word}
      </span>
      
      <div
        style={{
          width: 350,
          height: 40,
          backgroundColor: `${barColor}15`,
          borderRadius: 8,
          border: `1px solid ${barColor}40`,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          style={{
            width: `${barProgress * 100}%`,
            height: "100%",
            background: `linear-gradient(90deg, ${barColor}60, ${barColor})`,
            borderRadius: 8,
            boxShadow: isWinner 
              ? `0 0 ${20 * glowPulse}px ${barColor}, 0 0 40px ${barColor}` 
              : `0 0 10px ${barColor}40`,
          }}
        />
      </div>
      
      <span
        style={{
          opacity: labelOpacity,
          color: isWinner ? COLORS.cyan : COLORS.whiteDim,
          fontSize: 24,
          fontFamily: FONTS.mono,
          fontWeight: isWinner ? 700 : 400,
          width: 70,
          textShadow: isWinner ? `0 0 10px ${COLORS.cyan}` : "none",
        }}
      >
        {Math.round(probability * 100)}%
      </span>
      
      {isWinner && adjustedFrame > 50 && (
        <ParticleBurst x={520} y={20} color={COLORS.cyan} delay={delay + 50} count={15} />
      )}
    </div>
  );
};

export const Scene7_Output = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const titleOpacity = spring({ fps, frame, config: { damping: 200 } });
  const containerOpacity = spring({ fps, frame: frame - 20, config: { damping: 200 } });
  const winnerOpacity = spring({ fps, frame: frame - 90, config: { damping: 200 } });
  
  const prompt = "The cat sat on the";
  
  const predictions = [
    { word: "mat", probability: 0.42, isWinner: true },
    { word: "floor", probability: 0.18, isWinner: false },
    { word: "bed", probability: 0.15, isWinner: false },
    { word: "chair", probability: 0.12, isWinner: false },
    { word: "couch", probability: 0.08, isWinner: false },
    { word: "ground", probability: 0.05, isWinner: false },
  ];
  
  return (
    <AbsoluteFill>
      <GridBackground />
      
      <div style={{ position: "absolute", top: 50, left: 0, right: 0, textAlign: "center" }}>
        <GlowText size={48} color={COLORS.cyan} delay={0} glowColor={COLORS.cyan}>
          Step 4: Output Prediction
        </GlowText>
      </div>
      
      <div style={{ 
        position: "absolute", 
        top: "50%", 
        left: "50%", 
        transform: "translate(-50%, -50%)",
        opacity: containerOpacity,
      }}>
        <NeonCard glowColor={COLORS.cyan} width={650}>
          <div style={{ textAlign: "center", marginBottom: 30 }}>
            <p style={{ color: COLORS.gray, fontSize: 22, margin: 0, fontFamily: FONTS.body }}>
              Given "{prompt}", predict next word:
            </p>
          </div>
          
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            {predictions.map((pred, i) => (
              <ProbabilityBar
                key={i}
                word={pred.word}
                probability={pred.probability}
                delay={40 + i * 20}
                isWinner={pred.isWinner}
              />
            ))}
          </div>
        </NeonCard>
      </div>
      
      <div style={{ position: "absolute", bottom: 80, left: 0, right: 0, textAlign: "center", opacity: winnerOpacity }}>
        <span style={{ 
          color: COLORS.cyan, 
          fontSize: 32, 
          fontFamily: FONTS.body,
          fontWeight: 700,
          textShadow: `0 0 20px ${COLORS.cyan}, 0 0 40px ${COLORS.cyan}`,
        }}>
          "mat" has the highest probability!
        </span>
      </div>
    </AbsoluteFill>
  );
};

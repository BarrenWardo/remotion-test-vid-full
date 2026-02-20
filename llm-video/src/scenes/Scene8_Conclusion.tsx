import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { GridBackground } from "../components/GridBackground";
import { GlowText, Typewriter } from "../components/GlowText";
import { ParticleStream } from "../components/ParticleStream";
import { COLORS, FONTS } from "../styles/colors";

const FlipCard: React.FC<{
  name: string;
  delay: number;
  isPrimary?: boolean;
}> = ({ name, delay, isPrimary = false }) => {
  const frame = useCurrentFrame();
  const adjustedFrame = Math.max(0, frame - delay);
  
  const rotateY = interpolate(adjustedFrame, [0, 30], [90, 0], {
    extrapolateRight: "clamp",
  });
  
  const scale = spring({ fps: 30, frame: adjustedFrame - 20, config: { damping: 15, stiffness: 200 } });
  const floatY = Math.sin(frame * 0.05 + delay) * 5;
  
  const colors = [COLORS.cyan, COLORS.purple, COLORS.pink, COLORS.cyan];
  const colorIndex = delay / 40 % 4;
  const color = isPrimary ? COLORS.cyan : colors[Math.floor(colorIndex)];
  
  return (
    <div
      style={{
        transform: `perspective(500px) rotateY(${rotateY}deg) scale(${scale}) translateY(${floatY}px)`,
        padding: "20px 36px",
        backgroundColor: `${color}20`,
        borderRadius: 16,
        border: `2px solid ${color}`,
        boxShadow: `
          0 0 ${15 + Math.sin(frame * 0.08) * 5}px ${color}40,
          0 0 ${30 + Math.sin(frame * 0.08) * 10}px ${color}20,
          0 10px 30px rgba(0,0,0,0.3)
        `,
        color: COLORS.white,
        fontSize: 24,
        fontFamily: FONTS.display,
        fontWeight: 700,
        opacity: adjustedFrame > 10 ? 1 : adjustedFrame / 10,
        backfaceVisibility: "hidden",
      }}
    >
      {name}
    </div>
  );
};

export const Scene8_Conclusion = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const models = ["GPT-4", "Claude", "Gemini", "Llama"];
  const mainText = "LLMs predict the next word, one token at a time.";
  
  const textOpacity = spring({ fps, frame, config: { damping: 200 } });
  const glowPulse = 0.5 + Math.sin(frame * 0.1) * 0.3;
  
  return (
    <AbsoluteFill>
      <GridBackground />
      
      <div style={{ 
        position: "absolute", 
        top: "35%", 
        left: 0, 
        right: 0, 
        textAlign: "center",
        opacity: textOpacity,
      }}>
        <div
          style={{
            display: "inline-block",
            padding: "30px 60px",
            backgroundColor: `${COLORS.cyan}10`,
            borderRadius: 20,
            border: `2px solid ${COLORS.cyan}`,
            boxShadow: `
              0 0 ${30 * glowPulse}px ${COLORS.cyan}40,
              0 0 ${60 * glowPulse}px ${COLORS.cyan}20,
              inset 0 0 30px ${COLORS.cyan}10
            `,
          }}
        >
          <Typewriter 
            text={mainText} 
            size={42} 
            delay={0}
            color={COLORS.white}
          />
        </div>
      </div>
      
      <div style={{ 
        position: "absolute", 
        top: "55%", 
        left: 0, 
        right: 0, 
        textAlign: "center",
      }}>
        <p style={{ 
          color: COLORS.pink, 
          fontSize: 26, 
          fontFamily: FONTS.body,
          margin: 0,
          opacity: spring({ fps, frame: frame - 120, config: { damping: 200 } }),
          textShadow: `0 0 10px ${COLORS.pink}`,
        }}>
          Repeat this billions of times →
        </p>
      </div>
      
      <div style={{ 
        position: "absolute", 
        top: "70%", 
        left: 0, 
        right: 0, 
        display: "flex", 
        justifyContent: "center",
        gap: 30,
      }}>
        {models.map((model, i) => (
          <FlipCard 
            key={i} 
            name={model} 
            delay={140 + i * 40}
            isPrimary={i === 0}
          />
        ))}
      </div>
      
      <div style={{ position: "absolute", bottom: 50, left: 100 }}>
        <ParticleStream direction="right" count={20} color={COLORS.cyan} delay={100} speed={2} />
      </div>
      
      <div style={{ position: "absolute", bottom: 50, right: 100 }}>
        <ParticleStream direction="left" count={20} color={COLORS.purple} delay={100} speed={2} />
      </div>
    </AbsoluteFill>
  );
};

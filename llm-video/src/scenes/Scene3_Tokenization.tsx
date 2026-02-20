import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { GridBackground } from "../components/GridBackground";
import { GlowText, Typewriter } from "../components/GlowText";
import { NeonCard, GlowingBox, Arrow } from "../components/NeonCard";
import { ParticleStream, TrailParticle } from "../components/ParticleStream";
import { COLORS, FONTS } from "../styles/colors";

const TokenBox: React.FC<{ 
  text: string; 
  delay: number; 
  index: number;
  total: number;
}> = ({ text, delay, index, total }) => {
  const frame = useCurrentFrame();
  const adjustedFrame = Math.max(0, frame - delay);
  
  const opacity = spring({ fps: 30, frame: adjustedFrame, config: { damping: 200 } });
  const scale = spring({ fps: 30, frame: adjustedFrame, config: { damping: 15, stiffness: 200 } });
  const glowPulse = 0.5 + Math.sin((frame - delay) * 0.1) * 0.3;
  
  const colors = [COLORS.cyan, COLORS.purple, COLORS.pink, COLORS.cyan, COLORS.purple, COLORS.pink];
  const color = colors[index % colors.length];
  
  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale})`,
        padding: "14px 28px",
        backgroundColor: `${color}20`,
        borderRadius: 10,
        border: `1px solid ${color}60`,
        boxShadow: `
          0 0 ${15 * glowPulse}px ${color}40,
          0 0 ${30 * glowPulse}px ${color}20
        `,
        color: COLORS.white,
        fontSize: 26,
        fontFamily: FONTS.mono,
        fontWeight: 600,
      }}
    >
      {text}
    </div>
  );
};

export const Scene3_Tokenization = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const tokens = ["The", "cat", "sat", "on", "the", "mat"];
  const inputText = "The cat sat on the mat";
  
  const arrowOpacity = spring({ fps, frame: frame - 40, config: { damping: 200 } });
  const sectionOpacity = spring({ fps, frame: frame - 20, config: { damping: 200 } });
  
  return (
    <AbsoluteFill>
      <GridBackground />
      
      <div style={{ 
        position: "absolute", 
        top: 80, 
        left: 0, 
        right: 0, 
        textAlign: "center" 
      }}>
        <GlowText size={48} color={COLORS.cyan} delay={0} glowColor={COLORS.cyan}>
          Step 1: Tokenization
        </GlowText>
      </div>
      
      <div style={{ 
        position: "absolute", 
        inset: 0, 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        gap: 60,
      }}>
        <div style={{ opacity: sectionOpacity }}>
          <div style={{ textAlign: "center", marginBottom: 30 }}>
            <p style={{ 
              color: COLORS.gray, 
              fontSize: 22,
              fontFamily: FONTS.body,
              margin: 0,
            }}>
              Input Text
            </p>
          </div>
          <div style={{ 
            padding: "20px 40px", 
            backgroundColor: COLORS.bgCard,
            borderRadius: 12,
            border: `1px solid ${COLORS.whiteDim}30`,
          }}>
            <Typewriter text={inputText} size={32} delay={20} color={COLORS.white} />
          </div>
        </div>
        
        <div style={{ opacity: arrowOpacity }}>
          <Arrow direction="right" delay={0} color={COLORS.cyan} />
        </div>
        
        <div style={{ opacity: sectionOpacity }}>
          <div style={{ textAlign: "center", marginBottom: 30 }}>
            <p style={{ 
              color: COLORS.gray, 
              fontSize: 22,
              fontFamily: FONTS.body,
              margin: 0,
            }}>
              Tokens
            </p>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", maxWidth: 500 }}>
            {tokens.map((token, i) => (
              <TokenBox 
                key={i} 
                text={token} 
                delay={60 + i * 15} 
                index={i}
                total={tokens.length}
              />
            ))}
          </div>
        </div>
      </div>
      
      <div style={{ position: "absolute", bottom: 80, left: 0, right: 0, textAlign: "center" }}>
        <p style={{ 
          color: COLORS.gray, 
          fontSize: 24,
          fontFamily: FONTS.body,
          margin: 0,
        }}>
          Text is split into small units called "tokens"
        </p>
      </div>
      
      <div style={{ position: "absolute", top: "40%", left: "45%" }}>
        <ParticleStream direction="right" count={20} color={COLORS.cyan} delay={50} speed={3} />
      </div>
    </AbsoluteFill>
  );
};

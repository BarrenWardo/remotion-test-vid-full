import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { GridBackground } from "../components/GridBackground";
import { GlowText } from "../components/GlowText";
import { Arrow } from "../components/NeonCard";
import { ParticleStream } from "../components/ParticleStream";
import { COLORS, FONTS } from "../styles/colors";

const generateVector = (seed: number, frame: number) => {
  return Array.from({ length: 5 }, (_, i) => 
    (Math.sin(seed * i * 0.7 + frame * 0.01) * 0.5 + 0.5).toFixed(2)
  );
};

const TokenRow: React.FC<{ 
  token: string; 
  delay: number;
  index: number;
}> = ({ token, delay, index }) => {
  const frame = useCurrentFrame();
  const adjustedFrame = Math.max(0, frame - delay);
  
  const opacity = spring({ fps: 30, frame: adjustedFrame, config: { damping: 200 } });
  const translateX = spring({ fps: 30, frame: adjustedFrame, config: { damping: 15, stiffness: 200 } });
  
  return (
    <div
      style={{
        opacity,
        transform: `translateX(${(1 - translateX) * -30}px)`,
        display: "flex",
        alignItems: "center",
        gap: 20,
        marginBottom: 12,
      }}
    >
      <div
        style={{
          padding: "10px 24px",
          backgroundColor: `${COLORS.cyan}20`,
          borderRadius: 8,
          border: `1px solid ${COLORS.cyan}50`,
          color: COLORS.white,
          fontSize: 22,
          fontFamily: FONTS.mono,
          width: 100,
          textAlign: "center",
        }}
      >
        {token}
      </div>
      <span style={{ color: COLORS.gray, fontSize: 24 }}>→</span>
      <div
        style={{
          padding: "8px 16px",
          backgroundColor: `${COLORS.purple}15`,
          borderRadius: 8,
          border: `1px solid ${COLORS.purple}40`,
          color: COLORS.purple,
          fontSize: 16,
          fontFamily: FONTS.mono,
          opacity: 0.8 + Math.sin(frame * 0.05 + index) * 0.2,
        }}
      >
        [{generateVector(index, frame).join(", ")}]
      </div>
    </div>
  );
};

const ConvergingParticle: React.FC<{
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  delay: number;
  color: string;
}> = ({ startX, startY, endX, endY, delay, color }) => {
  const frame = useCurrentFrame();
  const adjustedFrame = Math.max(0, frame - delay);
  
  const progress = interpolate(adjustedFrame, [0, 60], [0, 1], {
    extrapolateRight: "clamp",
  });
  
  const eased = 1 - Math.pow(1 - progress, 3);
  
  const x = startX + (endX - startX) * eased;
  const y = startY + (endY - startY) * eased;
  const opacity = interpolate(adjustedFrame, [40, 60], [1, 0]);
  
  if (adjustedFrame > 65) return null;
  
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: 6,
        height: 6,
        borderRadius: "50%",
        backgroundColor: color,
        boxShadow: `0 0 8px ${color}`,
        transform: "translate(-50%, -50%)",
        opacity,
      }}
    />
  );
};

export const Scene4_Embeddings = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const tokens = ["The", "cat", "sat", "on", "the", "mat"];
  
  const sectionOpacity = spring({ fps, frame, config: { damping: 200 } });
  
  return (
    <AbsoluteFill>
      <GridBackground />
      
      <div style={{ 
        position: "absolute", 
        top: 60, 
        left: 0, 
        right: 0, 
        textAlign: "center" 
      }}>
        <GlowText size={48} color={COLORS.purple} delay={0} glowColor={COLORS.purple}>
          Step 2: Embeddings
        </GlowText>
      </div>
      
      <div style={{ 
        position: "absolute", 
        inset: 0, 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
      }}>
        <div style={{ 
          opacity: sectionOpacity,
          display: "flex",
          alignItems: "center",
          gap: 80,
        }}>
          <div>
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <p style={{ color: COLORS.gray, fontSize: 20, margin: 0, fontFamily: FONTS.body }}>
                Tokens
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {tokens.map((token, i) => (
                <TokenRow key={i} token={token} delay={30 + i * 12} index={i} />
              ))}
            </div>
          </div>
          
          <Arrow direction="right" delay={60} color={COLORS.purple} />
          
          <div>
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <p style={{ color: COLORS.gray, fontSize: 20, margin: 0, fontFamily: FONTS.body }}>
                Numerical Vectors
              </p>
            </div>
            <div style={{ 
              padding: "20px 30px", 
              backgroundColor: `${COLORS.purple}10`,
              borderRadius: 12,
              border: `1px solid ${COLORS.purple}30`,
            }}>
              <p style={{ 
                color: COLORS.whiteDim, 
                fontSize: 16, 
                fontFamily: FONTS.mono,
                margin: 0,
                lineHeight: 1.8,
              }}>
                Each token becomes a<br />
                list of numbers capturing<br />
                its <span style={{ color: COLORS.purple }}>meaning</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div style={{ position: "absolute", bottom: 80, left: 0, right: 0, textAlign: "center" }}>
        <p style={{ color: COLORS.gray, fontSize: 24, fontFamily: FONTS.body, margin: 0 }}>
          These vectors capture semantic meaning of words
        </p>
      </div>
      
      <div style={{ position: "absolute", top: "45%", left: "42%" }}>
        <ParticleStream direction="right" count={25} color={COLORS.purple} delay={40} speed={2.5} />
      </div>
    </AbsoluteFill>
  );
};

import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { GridBackground } from "../components/GridBackground";
import { GlowText } from "../components/GlowText";
import { ParticleStream } from "../components/ParticleStream";
import { COLORS, FONTS } from "../styles/colors";

const PipelineBlock: React.FC<{
  label: string;
  delay: number;
  color: string;
  width?: number;
}> = ({ label, delay, color, width = 140 }) => {
  const frame = useCurrentFrame();
  const adjustedFrame = Math.max(0, frame - delay);
  
  const opacity = spring({ fps: 30, frame: adjustedFrame, config: { damping: 200 } });
  const scale = spring({ fps: 30, frame: adjustedFrame, config: { damping: 15, stiffness: 200 } });
  const glowPulse = 0.5 + Math.sin((frame - delay) * 0.08) * 0.3;
  
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
      <div
        style={{
          opacity,
          transform: `scale(${scale})`,
          width,
          padding: "24px 20px",
          backgroundColor: `${color}15`,
          borderRadius: 16,
          border: `2px solid ${color}`,
          boxShadow: `
            0 0 ${20 * glowPulse}px ${color}50,
            0 0 ${40 * glowPulse}px ${color}20,
            inset 0 0 20px ${color}10
          `,
          textAlign: "center",
        }}
      >
        <span style={{ 
          color: COLORS.white, 
          fontSize: 18, 
          fontFamily: FONTS.body,
          fontWeight: 600,
          textShadow: `0 0 10px ${color}`,
        }}>
          {label}
        </span>
      </div>
    </div>
  );
};

const FlowingParticle: React.FC<{
  startX: number;
  endX: number;
  y: number;
  delay: number;
  color: string;
}> = ({ startX, endX, y, delay, color }) => {
  const frame = useCurrentFrame();
  const adjustedFrame = Math.max(0, frame - delay);
  
  const loopLength = endX - startX;
  const pos = (adjustedFrame * 3) % loopLength;
  const x = startX + pos;
  
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: 8,
        height: 8,
        borderRadius: "50%",
        backgroundColor: color,
        boxShadow: `0 0 10px ${color}, 0 0 20px ${color}`,
        transform: "translate(-50%, -50%)",
      }}
    />
  );
};

const ConnectionLine: React.FC<{
  startX: number;
  endX: number;
  y: number;
}> = ({ startX, endX, y }) => {
  const frame = useCurrentFrame();
  const dashOffset = (frame * 2) % 20;
  
  return (
    <div
      style={{
        position: "absolute",
        left: startX,
        top: y,
        width: endX - startX,
        height: 2,
        backgroundImage: `linear-gradient(90deg, ${COLORS.whiteDim} 50%, transparent 50%)`,
        backgroundSize: `20px 2px`,
        backgroundPosition: `-${dashOffset}px 0`,
        opacity: 0.3,
        transform: "translateY(-50%)",
      }}
    />
  );
};

export const Scene5_Transformer = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const infoOpacity = spring({ fps, frame: frame - 90, config: { damping: 200 } });
  
  const blocks = [
    { label: "Input", delay: 20, color: COLORS.cyan },
    { label: "Encoder", delay: 50, color: COLORS.purple },
    { label: "Attention", delay: 80, color: COLORS.pink },
    { label: "Decoder", delay: 110, color: COLORS.purple },
    { label: "Output", delay: 140, color: COLORS.cyan },
  ];
  
  const startX = 320;
  const blockWidth = 140;
  const gap = 80;
  const y = 540;
  
  return (
    <AbsoluteFill>
      <GridBackground />
      
      <div style={{ position: "absolute", top: 60, left: 0, right: 0, textAlign: "center" }}>
        <GlowText size={48} color={COLORS.pink} delay={0} glowColor={COLORS.pink}>
          Step 3: The Transformer
        </GlowText>
      </div>
      
      <div style={{ 
        position: "absolute", 
        top: "50%", 
        left: "50%", 
        transform: "translate(-50%, -50%)",
        display: "flex",
        alignItems: "center",
        gap: 0,
      }}>
        {blocks.map((block, i) => (
          <React.Fragment key={i}>
            <PipelineBlock 
              label={block.label} 
              delay={block.delay} 
              color={block.color}
              width={blockWidth}
            />
            {i < blocks.length - 1 && (
              <div style={{ position: "relative", width: gap, height: 80 }}>
                <ConnectionLine 
                  startX={blockWidth / 2 + 10} 
                  endX={gap - blockWidth / 2 - 10} 
                  y={40}
                />
                <FlowingParticle 
                  startX={blockWidth / 2 + 10}
                  endX={gap - blockWidth / 2 - 10}
                  y={40}
                  delay={block.delay + 30}
                  color={block.color}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      
      <div style={{ 
        position: "absolute", 
        bottom: 100, 
        left: 0, 
        right: 0, 
        textAlign: "center",
        opacity: infoOpacity,
      }}>
        <div style={{ 
          display: "inline-block",
          padding: "20px 40px",
          backgroundColor: `${COLORS.purple}15`,
          borderRadius: 16,
          border: `1px solid ${COLORS.purple}40`,
        }}>
          <p style={{ color: COLORS.white, fontSize: 22, fontFamily: FONTS.body, margin: 0 }}>
            The Transformer processes all tokens{' '}
            <span style={{ color: COLORS.pink }}>simultaneously</span>
          </p>
          <p style={{ color: COLORS.gray, fontSize: 18, fontFamily: FONTS.body, margin: "10px 0 0 0" }}>
            learning relationships between words
          </p>
        </div>
      </div>
    </AbsoluteFill>
  );
};

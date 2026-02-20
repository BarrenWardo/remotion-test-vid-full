import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { GridBackground } from "../components/GridBackground";
import { GlowText, HighlightText } from "../components/GlowText";
import { NeonCard } from "../components/NeonCard";
import { NeuralNetwork } from "../components/NeuralNetwork";
import { ParticleStream } from "../components/ParticleStream";
import { COLORS, FONTS } from "../styles/colors";

const DefinitionWord: React.FC<{ 
  word: string; 
  delay: number;
  isHighlight?: boolean;
  highlightColor?: string;
}> = ({ word, delay, isHighlight = false, highlightColor = COLORS.cyan }) => {
  const frame = useCurrentFrame();
  const adjustedFrame = Math.max(0, frame - delay);
  
  const opacity = spring({ fps: 30, frame: adjustedFrame, config: { damping: 200 } });
  const translateY = spring({ fps: 30, frame: adjustedFrame, config: { damping: 15, stiffness: 200 } });
  
  if (isHighlight) {
    const highlightProgress = spring({ fps: 30, frame: adjustedFrame - 20, config: { damping: 200 } });
    const scaleX = Math.max(0, Math.min(1, highlightProgress));
    
    return (
      <span style={{ opacity, display: "inline-block", marginRight: 8, position: "relative" }}>
        <span
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: "50%",
            height: "1.2em",
            transform: `translateY(-50%) scaleX(${scaleX})`,
            transformOrigin: "left center",
            backgroundColor: highlightColor,
            borderRadius: "0.2em",
            opacity: 0.4,
            zIndex: 0,
          }}
        />
        <span 
          style={{ 
            position: "relative", 
            zIndex: 1,
            color: highlightColor,
            textShadow: `0 0 10px ${highlightColor}`,
          }}
        >
          {word}
        </span>
      </span>
    );
  }
  
  return (
    <span
      style={{
        opacity,
        transform: `translateY(${(1 - translateY) * 20}px)`,
        display: "inline-block",
        marginRight: 8,
        color: COLORS.white,
        fontSize: 42,
        fontFamily: FONTS.body,
      }}
    >
      {word}
    </span>
  );
};

export const Scene2_WhatIsLLM = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const cardOpacity = spring({ fps, frame, config: { damping: 200 } });
  const cardScale = spring({ fps, frame, config: { damping: 15, stiffness: 200 } });
  
  const words = [
    { word: "A", delay: 0 },
    { word: "Large", delay: 8 },
    { word: "Language", delay: 16 },
    { word: "Model", delay: 28 },
    { word: "is", delay: 40 },
    { word: "a", delay: 48 },
    { word: "neural", delay: 56, highlight: true, color: COLORS.cyan },
    { word: "network", delay: 68, highlight: true, color: COLORS.cyan },
    { word: "trained", delay: 84 },
    { word: "on", delay: 96 },
    { word: "vast", delay: 104 },
    { word: "amounts", delay: 116 },
    { word: "of", delay: 132 },
    { word: "text", delay: 140, highlight: true, color: COLORS.purple },
    { word: "data", delay: 152, highlight: true, color: COLORS.purple },
    { word: ".", delay: 164 },
  ];
  
  return (
    <AbsoluteFill>
      <GridBackground />
      
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ 
          transform: `scale(${cardScale})`, 
          opacity: cardOpacity,
          maxWidth: 1000,
        }}>
          <NeonCard glowColor={COLORS.cyan} width={900}>
            <div style={{ textAlign: "center", marginBottom: 30 }}>
              <GlowText size={36} color={COLORS.cyan} delay={0} glowColor={COLORS.cyan}>
                What is an LLM?
              </GlowText>
            </div>
            
            <div style={{ 
              display: "flex", 
              flexWrap: "wrap", 
              justifyContent: "center",
              gap: 4,
              marginBottom: 40,
            }}>
              {words.map((w, i) => (
                <DefinitionWord 
                  key={i}
                  word={w.word} 
                  delay={w.delay + 60}
                  isHighlight={w.highlight}
                  highlightColor={w.color}
                />
              ))}
            </div>
            
            <div style={{ textAlign: "center" }}>
              <p style={{ 
                color: COLORS.gray, 
                fontSize: 22,
                fontFamily: FONTS.body,
                margin: 0,
              }}>
                They learn patterns in language to understand and generate text
              </p>
            </div>
          </NeonCard>
        </div>
      </div>
      
      <NeuralNetwork nodeCount={8} centerX={960} centerY={540} delay={180} />
      
      <div style={{ position: "absolute", bottom: 50, left: 100 }}>
        <ParticleStream direction="right" count={15} color={COLORS.purple} delay={200} speed={2} />
      </div>
    </AbsoluteFill>
  );
};

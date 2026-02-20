import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { GridBackground } from "../components/GridBackground";
import { GlowText, Typewriter } from "../components/GlowText";
import { ParticleStream } from "../components/ParticleStream";
import { COLORS, FONTS } from "../styles/colors";

const GlitchLetter: React.FC<{ 
  letter: string; 
  delay: number; 
  color?: string;
}> = ({ letter, delay, color = COLORS.cyan }) => {
  const frame = useCurrentFrame();
  const adjustedFrame = Math.max(0, frame - delay);
  
  const opacity = spring({ fps: 30, frame: adjustedFrame, config: { damping: 200 } });
  const scale = spring({ fps: 30, frame: adjustedFrame, config: { damping: 15, stiffness: 200 } });
  
  const glitchOffset = Math.random() > 0.9 ? (Math.random() - 0.5) * 6 : 0;
  const glitchActive = Math.random() > 0.95;
  
  return (
    <span
      style={{
        opacity,
        transform: `scale(${scale}) translateX(${glitchOffset}px)`,
        display: "inline-block",
        color: glitchActive ? COLORS.pink : color,
        textShadow: glitchActive 
          ? `${glitchOffset * 2}px 0 ${COLORS.cyan}, ${-glitchOffset * 2}px 0 ${COLORS.pink}`
          : `0 0 20px ${color}, 0 0 40px ${color}`,
        fontSize: 120,
        fontWeight: 900,
        fontFamily: FONTS.display,
        letterSpacing: "0.1em",
      }}
    >
      {letter}
    </span>
  );
};

export const Scene1_Intro = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const titleY = spring({ fps, frame: frame - 30, config: { damping: 200 } });
  const subtitleOpacity = spring({ fps, frame: frame - 90, config: { damping: 200 } });
  
  return (
    <AbsoluteFill>
      <GridBackground />
      
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ transform: `translateY(${(1 - titleY) * -30}px)` }}>
          <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
            <GlitchLetter letter="H" delay={0} color={COLORS.cyan} />
            <GlitchLetter letter="O" delay={8} color={COLORS.cyan} />
            <GlitchLetter letter="W" delay={16} color={COLORS.cyan} />
          </div>
          
          <div style={{ display: "flex", gap: 10, marginBottom: 20, justifyContent: "center" }}>
            <GlitchLetter letter="L" delay={30} color={COLORS.purple} />
            <GlitchLetter letter="L" delay={38} color={COLORS.purple} />
            <GlitchLetter letter="M" delay={46} color={COLORS.purple} />
            <GlitchLetter letter="s" delay={54} color={COLORS.purple} />
          </div>
          
          <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
            <GlitchLetter letter="W" delay={70} color={COLORS.pink} />
            <GlitchLetter letter="O" delay={78} color={COLORS.pink} />
            <GlitchLetter letter="R" delay={86} color={COLORS.pink} />
            <GlitchLetter letter="K" delay={94} color={COLORS.pink} />
          </div>
        </div>
        
        <div style={{ marginTop: 60, opacity: subtitleOpacity }}>
          <Typewriter 
            text="Large Language Models Explained" 
            size={32} 
            delay={30}
            color={COLORS.whiteDim}
          />
        </div>
        
        <div style={{ position: "absolute", bottom: 100, opacity: subtitleOpacity }}>
          <ParticleStream direction="right" count={20} color={COLORS.cyan} delay={60} speed={3} />
        </div>
      </div>
    </AbsoluteFill>
  );
};

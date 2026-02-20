import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS } from "../styles/colors";

interface GlowTextProps {
  children: React.ReactNode;
  size?: number;
  weight?: number;
  color?: string;
  delay?: number;
  glitch?: boolean;
  glowColor?: string;
  center?: boolean;
}

export const GlowText: React.FC<GlowTextProps> = ({
  children,
  size = 64,
  weight = 700,
  color = COLORS.white,
  delay = 0,
  glitch = false,
  glowColor = COLORS.cyan,
  center = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const adjustedFrame = Math.max(0, frame - delay);
  const opacity = spring({ fps, frame: adjustedFrame, config: { damping: 200 } });
  const scale = spring({ fps, frame: adjustedFrame, config: { damping: 15, stiffness: 200 } });
  const glowIntensity = 0.5 + Math.sin(frame * 0.08) * 0.3;
  
  const glitchOffset = glitch && Math.random() > 0.92 ? (Math.random() - 0.5) * 8 : 0;
  const glitchActive = glitch && Math.random() > 0.95;
  
  const letterSpacing = center ? "0.05em" : "normal";
  
  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale}) translateX(${glitchOffset}px)`,
        display: "inline-block",
        color,
        fontSize: size,
        fontWeight: weight,
        fontFamily: FONTS.display,
        letterSpacing,
        textShadow: glitchActive 
          ? `${glitchOffset * 2}px 0 ${COLORS.cyan}, ${-glitchOffset * 2}px 0 ${COLORS.pink}`
          : `
            0 0 ${10 * glowIntensity}px ${glowColor},
            0 0 ${20 * glowIntensity}px ${glowColor},
            0 0 ${40 * glowIntensity}px ${glowColor}
          `,
        textAlign: center ? "center" : "left",
      }}
    >
      {children}
    </div>
  );
};

interface TypewriterProps {
  text: string;
  size?: number;
  color?: string;
  delay?: number;
  speed?: number;
  cursor?: boolean;
}

export const Typewriter: React.FC<TypewriterProps> = ({
  text,
  size = 48,
  color = COLORS.white,
  delay = 0,
  speed = 3,
  cursor = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const adjustedFrame = Math.max(0, frame - delay);
  const charCount = Math.floor(adjustedFrame / speed);
  const displayText = text.slice(0, Math.min(charCount, text.length));
  
  const cursorBlink = interpolate(
    frame % 20,
    [0, 10, 20],
    [1, 0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  
  const opacity = spring({ fps, frame: adjustedFrame, config: { damping: 200 } });
  
  return (
    <div style={{ opacity, display: "inline-block" }}>
      <span
        style={{
          color,
          fontSize: size,
          fontFamily: FONTS.body,
          textShadow: `0 0 10px ${COLORS.cyan}, 0 0 20px ${COLORS.cyan}`,
        }}
      >
        {displayText}
      </span>
      {cursor && charCount < text.length && (
        <span
          style={{
            color: COLORS.cyan,
            fontSize: size,
            marginLeft: 4,
            opacity: cursorBlink,
          }}
        >
          |
        </span>
      )}
    </div>
  );
};

interface HighlightTextProps {
  text: string;
  highlight: string;
  size?: number;
  highlightColor?: string;
  delay?: number;
}

export const HighlightText: React.FC<HighlightTextProps> = ({
  text,
  highlight,
  size = 48,
  highlightColor = COLORS.cyan,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const adjustedFrame = Math.max(0, frame - delay);
  const opacity = spring({ fps, frame: adjustedFrame, config: { damping: 200 } });
  
  const highlightIndex = text.indexOf(highlight);
  const preText = highlightIndex >= 0 ? text.slice(0, highlightIndex) : text;
  const postText = highlightIndex >= 0 ? text.slice(highlightIndex + highlight.length) : "";
  
  const highlightProgress = spring({ 
    fps, 
    frame: adjustedFrame - 20, 
    config: { damping: 200 } 
  });
  const scaleX = Math.max(0, Math.min(1, highlightProgress));
  
  return (
    <div style={{ opacity, fontSize: size, fontFamily: FONTS.body, color: COLORS.white }}>
      <span>{preText}</span>
      <span style={{ position: "relative", display: "inline-block" }}>
        <span
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: "50%",
            height: "1.1em",
            transform: `translateY(-50%) scaleX(${scaleX})`,
            transformOrigin: "left center",
            backgroundColor: highlightColor,
            borderRadius: "0.2em",
            opacity: 0.3,
            zIndex: 0,
          }}
        />
        <span style={{ position: "relative", zIndex: 1 }}>{highlight}</span>
      </span>
      <span>{postText}</span>
    </div>
  );
};

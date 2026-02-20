import { interpolate, spring, useCurrentFrame, useVideoConfig, AbsoluteFill } from "remotion";
import { COLORS, FONTS } from "../styles/colors";

interface NeonCardProps {
  children: React.ReactNode;
  delay?: number;
  glowColor?: string;
  width?: number | string;
  height?: number | string;
}

export const NeonCard: React.FC<NeonCardProps> = ({
  children,
  delay = 0,
  glowColor = COLORS.cyan,
  width = "auto",
  height = "auto",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const adjustedFrame = Math.max(0, frame - delay);
  const opacity = spring({ fps, frame: adjustedFrame, config: { damping: 200 } });
  const scale = spring({ fps, frame: adjustedFrame, config: { damping: 15, stiffness: 200 } });
  const glowPulse = 0.5 + Math.sin(frame * 0.1) * 0.3;
  
  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale})`,
        backgroundColor: COLORS.bgCardGlow,
        borderRadius: 20,
        padding: 30,
        border: `1px solid ${glowColor}`,
        boxShadow: `
          0 0 ${20 * glowPulse}px ${glowColor}40,
          0 0 ${40 * glowPulse}px ${glowColor}20,
          inset 0 0 30px ${glowColor}10
        `,
        width,
        height,
        backdropFilter: "blur(10px)",
      }}
    >
      {children}
    </div>
  );
};

interface GlowingBoxProps {
  children: React.ReactNode;
  color?: string;
  delay?: number;
  pulse?: boolean;
}

export const GlowingBox: React.FC<GlowingBoxProps> = ({
  children,
  color = COLORS.cyan,
  delay = 0,
  pulse = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const adjustedFrame = Math.max(0, frame - delay);
  const opacity = spring({ fps, frame: adjustedFrame, config: { damping: 200 } });
  const glowIntensity = pulse 
    ? 0.5 + Math.sin(frame * 0.08) * 0.3 
    : 0.5;
  
  return (
    <div
      style={{
        opacity,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px 32px",
        backgroundColor: `${color}20`,
        borderRadius: 12,
        border: `1px solid ${color}50`,
        boxShadow: `
          0 0 ${15 * glowIntensity}px ${color}40,
          0 0 ${30 * glowIntensity}px ${color}20
        `,
        color: COLORS.white,
        fontFamily: FONTS.body,
        fontWeight: 600,
        fontSize: 24,
      }}
    >
      {children}
    </div>
  );
};

interface AnimatedBorderProps {
  children: React.ReactNode;
  delay?: number;
}

export const AnimatedBorder: React.FC<AnimatedBorderProps> = ({ children, delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const adjustedFrame = Math.max(0, frame - delay);
  const opacity = spring({ fps, frame: adjustedFrame, config: { damping: 200 } });
  
  const gradientPosition = interpolate(frame % 60, [0, 60], [0, 100]);
  
  return (
    <div
      style={{
        opacity,
        position: "relative",
        borderRadius: 16,
        background: COLORS.bgCard,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: -2,
          borderRadius: 18,
          background: `linear-gradient(90deg, ${COLORS.cyan}, ${COLORS.purple}, ${COLORS.pink}, ${COLORS.cyan})`,
          backgroundSize: "300% 100%",
          backgroundPosition: `${gradientPosition}% 0`,
          zIndex: -1,
          animation: "none",
        }}
      />
      <div style={{ padding: 24, position: "relative", zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
};

interface PulsingDotProps {
  color?: string;
  size?: number;
  delay?: number;
}

export const PulsingDot: React.FC<PulsingDotProps> = ({
  color = COLORS.cyan,
  size = 12,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  
  const pulseScale = interpolate(
    Math.sin((frame - delay) * 0.1),
    [-1, 1],
    [0.8, 1.2]
  );
  const opacity = interpolate(
    Math.sin((frame - delay) * 0.1),
    [-1, 1],
    [0.5, 1]
  );
  
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: color,
        boxShadow: `0 0 ${size * 2}px ${color}`,
        transform: `scale(${pulseScale})`,
        opacity,
      }}
    />
  );
};

interface ArrowProps {
  direction?: "left" | "right" | "up" | "down";
  delay?: number;
  color?: string;
}

export const Arrow: React.FC<ArrowProps> = ({
  direction = "right",
  delay = 0,
  color = COLORS.cyan,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const adjustedFrame = Math.max(0, frame - delay);
  const opacity = spring({ fps, frame: adjustedFrame, config: { damping: 200 } });
  const bounce = spring({ fps, frame: adjustedFrame, config: { damping: 15, stiffness: 200 } });
  
  const rotations = { left: 180, right: 0, up: -90, down: 90 };
  
  const arrows = { left: "→", right: "→", up: "→", down: "→" };
  
  return (
    <span
      style={{
        opacity,
        transform: `rotate(${rotations[direction]}deg) scale(${bounce})`,
        display: "inline-block",
        fontSize: 32,
        color,
        textShadow: `0 0 10px ${color}`,
      }}
    >
      →
    </span>
  );
};

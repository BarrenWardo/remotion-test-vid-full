import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { COLORS } from "../styles/colors";

interface ParticleStreamProps {
  direction?: "left" | "right" | "up" | "down";
  count?: number;
  color?: string;
  delay?: number;
  speed?: number;
}

const StreamParticle: React.FC<{
  index: number;
  direction: "left" | "right" | "up" | "down";
  color: string;
  speed: number;
  delay: number;
}> = ({ index, direction, color, speed, delay }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  
  const adjustedFrame = Math.max(0, frame - delay);
  const offset = index * 137;
  
  let x: number, y: number;
  const pos = ((adjustedFrame * speed + offset) % (direction === "left" || direction === "right" ? width : height));
  
  if (direction === "left" || direction === "right") {
    x = direction === "right" ? pos : width - pos;
    y = (index * 73) % height;
  } else {
    x = (index * 97) % width;
    y = direction === "down" ? pos : height - pos;
  }
  
  const opacity = interpolate(
    pos,
    [0, 50, width - 50, width],
    [0, 0.8, 0.8, 0],
    { extrapolateRight: "clamp" }
  );
  
  const size = 2 + (index % 3) * 1.5;
  
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: color,
        boxShadow: `0 0 ${size * 2}px ${color}`,
        opacity,
      }}
    />
  );
};

export const ParticleStream: React.FC<ParticleStreamProps> = ({
  direction = "right",
  count = 30,
  color = COLORS.cyan,
  delay = 0,
  speed = 2,
}) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <StreamParticle
          key={i}
          index={i}
          direction={direction}
          color={color}
          speed={speed}
          delay={delay + i * 3}
        />
      ))}
    </>
  );
};

interface ParticleBurstProps {
  x: number;
  y: number;
  color?: string;
  delay?: number;
  count?: number;
}

const BurstParticle: React.FC<{
  index: number;
  total: number;
  x: number;
  y: number;
  color: string;
  delay: number;
}> = ({ index, total, x, y, color, delay }) => {
  const frame = useCurrentFrame();
  const adjustedFrame = Math.max(0, frame - delay);
  
  const angle = (index / total) * Math.PI * 2;
  const distance = adjustedFrame * 3;
  const opacity = interpolate(adjustedFrame, [0, 40], [1, 0]);
  
  const px = x + Math.cos(angle) * distance;
  const py = y + Math.sin(angle) * distance;
  
  if (opacity <= 0) return null;
  
  return (
    <div
      style={{
        position: "absolute",
        left: px,
        top: py,
        width: 4,
        height: 4,
        borderRadius: "50%",
        backgroundColor: color,
        boxShadow: `0 0 6px ${color}`,
        opacity,
      }}
    />
  );
};

export const ParticleBurst: React.FC<ParticleBurstProps> = ({
  x,
  y,
  color = COLORS.cyan,
  delay = 0,
  count = 20,
}) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <BurstParticle
          key={i}
          index={i}
          total={count}
          x={x}
          y={y}
          color={color}
          delay={delay}
        />
      ))}
    </>
  );
};

interface TrailParticleProps {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  color?: string;
  delay?: number;
}

export const TrailParticle: React.FC<TrailParticleProps> = ({
  startX,
  startY,
  endX,
  endY,
  color = COLORS.cyan,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const adjustedFrame = Math.max(0, frame - delay);
  const duration = 60;
  
  const progress = interpolate(adjustedFrame, [0, duration], [0, 1], {
    extrapolateRight: "clamp",
  });
  
  const x = startX + (endX - startX) * progress;
  const y = startY + (endY - startY) * progress;
  
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

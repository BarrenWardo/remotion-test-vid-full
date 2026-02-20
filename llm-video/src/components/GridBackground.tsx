import { useCurrentFrame, useVideoConfig, AbsoluteFill, interpolate } from "remotion";
import { COLORS } from "../styles/colors";

const GRID_SIZE = 60;
const PARTICLE_COUNT = 40;

const Particle: React.FC<{ index: number; frame: number }> = ({ index, frame }) => {
  const { width, height } = useVideoConfig();
  
  const speedX = 0.2 + (index % 5) * 0.1;
  const speedY = 0.15 + (index % 3) * 0.08;
  const offset = (index * 137.5) % 360;
  
  const x = ((index * 97 + frame * speedX) % width);
  const y = ((index * 73 + frame * speedY + Math.sin(frame * 0.02 + index) * 20) % height);
  const opacity = 0.15 + Math.sin(frame * 0.05 + index) * 0.1;
  const size = 2 + (index % 3) * 1.5;
  
  const colors = [COLORS.cyan, COLORS.purple, COLORS.pink];
  const color = colors[index % 3];
  
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

const Scanline: React.FC<{ frame: number }> = ({ frame }) => {
  const { height } = useVideoConfig();
  const scanY = (frame * 2) % (height + 200) - 100;
  const opacity = interpolate(
    frame % 120,
    [0, 100, 120],
    [0, 0.4, 0],
    { extrapolateRight: "clamp" }
  );
  
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: scanY,
        width: "100%",
        height: 150,
        background: `linear-gradient(to bottom, transparent, ${COLORS.cyanDim}, transparent)`,
        opacity,
        pointerEvents: "none",
      }}
    />
  );
};

const GridLines: React.FC<{ frame: number }> = ({ frame }) => {
  const { width, height } = useVideoConfig();
  const offsetX = (frame * 0.3) % GRID_SIZE;
  const offsetY = (frame * 0.2) % GRID_SIZE;
  
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `
          linear-gradient(${COLORS.cyanDim} 1px, transparent 1px),
          linear-gradient(90deg, ${COLORS.cyanDim} 1px, transparent 1px)
        `,
        backgroundSize: `${GRID_SIZE}px ${GRID_SIZE}px`,
        backgroundPosition: `${-offsetX}px ${-offsetY}px`,
        opacity: 0.4,
      }}
    />
  );
};

const GradientOrbs: React.FC<{ frame: number }> = ({ frame }) => {
  const { width, height } = useVideoConfig();
  
  const orb1X = width * 0.3 + Math.sin(frame * 0.01) * 100;
  const orb1Y = height * 0.3 + Math.cos(frame * 0.015) * 80;
  
  const orb2X = width * 0.7 + Math.cos(frame * 0.012) * 120;
  const orb2Y = height * 0.6 + Math.sin(frame * 0.018) * 60;
  
  const orb3X = width * 0.5 + Math.sin(frame * 0.008) * 80;
  const orb3Y = height * 0.8 + Math.cos(frame * 0.01) * 40;
  
  return (
    <>
      <div
        style={{
          position: "absolute",
          left: orb1X,
          top: orb1Y,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.purpleDim}, transparent 70%)`,
          transform: "translate(-50%, -50%)",
          filter: "blur(40px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: orb2X,
          top: orb2Y,
          width: 350,
          height: 350,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.cyanDim}, transparent 70%)`,
          transform: "translate(-50%, -50%)",
          filter: "blur(40px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: orb3X,
          top: orb3Y,
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.pinkDim}, transparent 70%)`,
          transform: "translate(-50%, -50%)",
          filter: "blur(40px)",
        }}
      />
    </>
  );
};

export const GridBackground: React.FC = () => {
  const frame = useCurrentFrame();
  
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bgDeep, overflow: "hidden" }}>
      <GradientOrbs frame={frame} />
      <GridLines frame={frame} />
      <Scanline frame={frame} />
      {Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
        <Particle key={i} index={i} frame={frame} />
      ))}
    </AbsoluteFill>
  );
};

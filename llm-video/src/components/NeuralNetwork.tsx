import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring, AbsoluteFill } from "remotion";
import { COLORS } from "../styles/colors";

interface NeuralNodeProps {
  x: number;
  y: number;
  delay?: number;
  color?: string;
}

const NeuralNode: React.FC<NeuralNodeProps> = ({
  x,
  y,
  delay = 0,
  color = COLORS.cyan,
}) => {
  const frame = useCurrentFrame();
  const adjustedFrame = Math.max(0, frame - delay);
  
  const scale = spring({ fps: 30, frame: adjustedFrame, config: { damping: 15, stiffness: 200 } });
  const glowPulse = 0.5 + Math.sin((frame - delay) * 0.1) * 0.3;
  
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: 16,
        height: 16,
        borderRadius: "50%",
        backgroundColor: color,
        boxShadow: `
          0 0 ${10 * scale * glowPulse}px ${color},
          0 0 ${20 * scale * glowPulse}px ${color},
          0 0 ${30 * scale * glowPulse}px ${color}
        `,
        transform: `translate(-50%, -50%) scale(${scale})`,
      }}
    />
  );
};

interface PulseWaveProps {
  x: number;
  y: number;
  delay?: number;
  color?: string;
}

const PulseWave: React.FC<PulseWaveProps> = ({
  x,
  y,
  delay = 0,
  color = COLORS.cyan,
}) => {
  const frame = useCurrentFrame();
  const adjustedFrame = Math.max(0, frame - delay);
  
  const scale = interpolate(adjustedFrame, [0, 60], [0.5, 4], {
    extrapolateRight: "clamp",
  });
  const opacity = interpolate(adjustedFrame, [0, 30, 60], [0.8, 0.4, 0], {
    extrapolateRight: "clamp",
  });
  
  if (adjustedFrame > 65) return null;
  
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: 30 * scale,
        height: 30 * scale,
        borderRadius: "50%",
        border: `2px solid ${color}`,
        boxShadow: `0 0 ${10 * scale}px ${color}`,
        transform: "translate(-50%, -50%)",
        opacity,
      }}
    />
  );
};

interface ConnectionLineProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  delay?: number;
  color?: string;
}

const ConnectionLine: React.FC<ConnectionLineProps> = ({
  x1,
  y1,
  x2,
  y2,
  delay = 0,
  color = COLORS.cyan,
}) => {
  const frame = useCurrentFrame();
  const adjustedFrame = Math.max(0, frame - delay);
  
  const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
  
  const drawProgress = spring({ fps: 30, frame: adjustedFrame, config: { damping: 200 } });
  
  return (
    <div
      style={{
        position: "absolute",
        left: x1,
        top: y1,
        width: length * drawProgress,
        height: 2,
        backgroundColor: color,
        boxShadow: `0 0 4px ${color}`,
        transformOrigin: "left center",
        transform: `rotate(${angle}deg)`,
        opacity: drawProgress * 0.7,
      }}
    />
  );
};

interface NeuralNetworkProps {
  nodeCount?: number;
  centerX?: number;
  centerY?: number;
  delay?: number;
}

export const NeuralNetwork: React.FC<NeuralNetworkProps> = ({
  nodeCount = 6,
  centerX = 960,
  centerY = 540,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  
  const nodes = [];
  const radius = 180;
  
  for (let i = 0; i < nodeCount; i++) {
    const angle = (i / nodeCount) * Math.PI * 2 - Math.PI / 2;
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;
    nodes.push({ x, y, angle });
  }
  
  const colors = [COLORS.cyan, COLORS.purple, COLORS.pink];
  
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      {nodes.map((node, i) => (
        <React.Fragment key={i}>
          <ConnectionLine
            x1={centerX}
            y1={centerY}
            x2={node.x}
            y2={node.y}
            delay={delay + 60 + i * 10}
            color={colors[i % 3]}
          />
          <NeuralNode
            x={node.x}
            y={node.y}
            delay={delay + i * 15}
            color={colors[i % 3]}
          />
        </React.Fragment>
      ))}
      
      <PulseWave x={centerX} y={centerY} delay={delay + 90} color={COLORS.cyan} />
      <PulseWave x={centerX} y={centerY} delay={delay + 110} color={COLORS.purple} />
      <PulseWave x={centerX} y={centerY} delay={delay + 130} color={COLORS.pink} />
      
      <NeuralNode x={centerX} y={centerY} delay={delay} color={COLORS.white} />
    </div>
  );
};

interface MiniNeuralProps {
  delay?: number;
}

export const MiniNeural: React.FC<MiniNeuralProps> = ({ delay = 0 }) => {
  const frame = useCurrentFrame();
  
  const nodes = [
    { x: 0, y: 0 },
    { x: -40, y: -30 },
    { x: 40, y: -30 },
    { x: -40, y: 30 },
    { x: 40, y: 30 },
    { x: 0, y: 60 },
  ];
  
  return (
    <div style={{ position: "relative", width: 100, height: 100 }}>
      {nodes.map((node, i) => (
        <React.Fragment key={i}>
          {i > 0 && (
            <ConnectionLine
              x1={nodes[0].x + 50}
              y1={nodes[0].y + 50}
              x2={node.x + 50}
              y2={node.y + 50}
              delay={delay + i * 10}
              color={i % 2 === 0 ? COLORS.cyan : COLORS.purple}
            />
          )}
          <NeuralNode
            x={node.x + 50}
            y={node.y + 50}
            delay={delay + i * 10}
            color={i === 0 ? COLORS.white : COLORS.cyan}
          />
        </React.Fragment>
      ))}
    </div>
  );
};

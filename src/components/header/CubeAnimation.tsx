import React from "react";
import "./CubeAnimation.css";

// Minecraft isometric cube coordinates
// Points for a 3D block: top, left, right faces
const topFace = "48,12 84,30 48,48 12,30"; // diamond
const leftFace = "12,30 48,48 48,84 12,66";
const rightFace = "48,48 84,30 84,66 48,84";

// Outline edges (in drawing order)
const edges = [
  // Top face
  [48,12,84,30], [84,30,48,48], [48,48,12,30], [12,30,48,12],
  // Left face
  [12,30,48,48], [48,48,48,84], [48,84,12,66], [12,66,12,30],
  // Right face
  [48,48,84,30], [84,30,84,66], [84,66,48,84], [48,84,48,48]
];

const CubeAnimation: React.FC = () => {
  // Mathpoint cube using brand colors
  return (
    <div className="cube-animation-container">
      <svg
        className="cube-svg"
        viewBox="0 0 96 96"
        width="64"
        height="64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Faces */}
        <polygon points={topFace} fill="#ffd9a0" />
        <polygon points={leftFace} fill="#fb923c" />
        <polygon points={rightFace} fill="#c26619" />
        
        {/* Outlines */}
        {edges.map(([x1, y1, x2, y2]: number[], i: number) => (
          <line
            key={`edge-${i}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#fb923c"
            strokeWidth={4.5}
            strokeLinecap="square"
            filter="drop-shadow(1px 1px 0 #c26619)"
          />
        ))}
      </svg>
    </div>
  );
};

export default CubeAnimation;

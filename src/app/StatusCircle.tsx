import React from "react";

interface Phase {
  label: string;
  status: "done" | "current" | "pending";
}

interface Props {
  phases: Phase[];
}

const SegmentedProgressCircle: React.FC<Props> = ({ phases }) => {
  const size = 260;
  const radius = 100;
  const strokeWidth = 18;
  const center = size / 2;
  const total = phases.length;

  const getColor = (status: Phase["status"]) => {
    if (status === "done") return "#22c55e"; // green
    if (status === "current") return "#3b82f6"; // blue
    return "#e5e7eb"; // gray
  };

  const renderSegments = () => {
    const segments = [];

    for (let i = 0; i < total; i++) {
      const startAngle = (360 / total) * i - 90;
      const endAngle = startAngle + 360 / total;
      const x1 = center + radius * Math.cos((Math.PI / 180) * startAngle);
      const y1 = center + radius * Math.sin((Math.PI / 180) * startAngle);
      const x2 = center + radius * Math.cos((Math.PI / 180) * endAngle);
      const y2 = center + radius * Math.sin((Math.PI / 180) * endAngle);

      const path = `
        M ${x1} ${y1}
        A ${radius} ${radius} 0 0 1 ${x2} ${y2}
      `;

      segments.push(
        <path
          key={i}
          d={path}
          stroke={getColor(phases[i].status)}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
        />
      );
    }

    return segments;
  };

  const currentPhase = phases.find(p => p.status === "current");

  return (
    <div className="relative w-64 h-64">
      {/* SVG BACKGROUND */}
      <svg width={size} height={size} className="absolute top-0 left-0 z-0">
        {renderSegments()}
      </svg>

      {/* TEXT OVERLAY */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center">
        <span className="text-gray-500 text-sm">Trenutno:</span>
        <span className="text-2xl font-bold text-black">{currentPhase?.label}</span>
      </div>
    </div>
  );
};

export default SegmentedProgressCircle;

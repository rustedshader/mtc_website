'use client'
import React, { useState, useEffect } from 'react';
import { useId } from "react";
import { cn } from "@/lib/utils";

interface DotPatternProps {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  cx?: number;
  cy?: number;
  cr?: number;
  className?: string;
  [key: string]: unknown;
}

const CursorDotPattern = ({
  width = 16,
  height = 16,
  x = 0,
  y = 0,
  cx = 1,
  cy = 1,
  cr = 1,
  className,
  ...props
}: DotPatternProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const id = useId();

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black pointer-events-none">
      <svg
        aria-hidden="true"
        className={cn(
          "absolute inset-0 h-full w-full fill-neutral-100/80",
          className
        )}
        {...props}
      >
        <defs>
          <pattern
            id={id}
            width={width}
            height={height}
            patternUnits="userSpaceOnUse"
            patternContentUnits="userSpaceOnUse"
            x={x}
            y={y}
          >
            <circle id="pattern-circle" cx={cx} cy={cy} r={cr} />
          </pattern>
          <radialGradient id="cursor-gradient">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="cursor-mask">
            <circle
              cx={mousePosition.x}
              cy={mousePosition.y}
              r="190"
              fill="url(#cursor-gradient)"
            />
          </mask>
        </defs>
        <rect
          width="100%"
          height="100%"
          strokeWidth={0}
          fill={`url(#${id})`}
          mask="url(#cursor-mask)"
        />
      </svg>
    </div>
  );
};

export default CursorDotPattern;
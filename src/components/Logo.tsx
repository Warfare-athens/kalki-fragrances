import React from "react";

interface LogoProps {
  className?: string;
}

export function Logo({ className = "h-12 w-auto" }: LogoProps) {
  return (
    <svg
      viewBox="0 0 400 170"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer rectangular border with top gap */}
      {/* Top Left Segment */}
      <line x1="10" y1="30" x2="170" y2="30" />
      {/* Top Right Segment */}
      <line x1="230" y1="30" x2="390" y2="30" />
      {/* Right side */}
      <line x1="390" y1="30" x2="390" y2="160" />
      {/* Bottom side */}
      <line x1="390" y1="160" x2="10" y2="160" />
      {/* Left side */}
      <line x1="10" y1="160" x2="10" y2="30" />

      {/* Diamond Icon at top center */}
      <g transform="translate(175, 5)">
        {/* Facets with fills for 3D look */}
        {/* Top-Right outer facet (light shading) */}
        <polygon points="25,0 25,14 36,25" fill="currentColor" fillOpacity="0.08" stroke="none" />
        {/* Left-Top outer facet (medium shading) */}
        <polygon points="0,25 14,25 25,14" fill="currentColor" fillOpacity="0.18" stroke="none" />
        {/* Bottom-Left outer facet (dark shading) */}
        <polygon points="25,50 25,36 14,25" fill="currentColor" fillOpacity="0.28" stroke="none" />
        {/* Bottom-Right outer facet (light shading) */}
        <polygon points="25,50 25,36 36,25" fill="currentColor" fillOpacity="0.08" stroke="none" />
        {/* Right-Bottom outer facet (medium shading) */}
        <polygon points="50,25 36,25 25,36" fill="currentColor" fillOpacity="0.18" stroke="none" />
        {/* Right-Top outer facet (transparent/very light) */}
        <polygon points="50,25 36,25 25,14" fill="currentColor" fillOpacity="0.03" stroke="none" />
        {/* Left-Bottom outer facet (very light) */}
        <polygon points="0,25 14,25 25,36" fill="currentColor" fillOpacity="0.03" stroke="none" />
        {/* Top-Left outer facet (very light) */}
        <polygon points="25,0 25,14 14,25" fill="currentColor" fillOpacity="0.03" stroke="none" />

        {/* Inner Diamond quadrants */}
        {/* Top-Left quadrant */}
        <polygon points="25,14 25,25 14,25" fill="currentColor" fillOpacity="0.12" stroke="none" />
        {/* Top-Right quadrant */}
        <polygon points="25,14 25,25 36,25" fill="currentColor" fillOpacity="0.03" stroke="none" />
        {/* Bottom-Left quadrant */}
        <polygon points="25,36 25,25 14,25" fill="currentColor" fillOpacity="0.03" stroke="none" />
        {/* Bottom-Right quadrant */}
        <polygon points="25,36 25,25 36,25" fill="currentColor" fillOpacity="0.25" stroke="none" />

        {/* Outer Diamond Outline */}
        <polygon points="25,0 50,25 25,50 0,25" />
        {/* Inner Diamond Outline */}
        <polygon points="25,14 36,25 25,36 14,25" />

        {/* Connection lines from outer to inner vertices */}
        <line x1="25" y1="0" x2="25" y2="14" />
        <line x1="50" y1="25" x2="36" y2="25" />
        <line x1="25" y1="50" x2="25" y2="36" />
        <line x1="0" y1="25" x2="14" y2="25" />

        {/* Inner cross lines */}
        <line x1="25" y1="14" x2="25" y2="36" />
        <line x1="14" y1="25" x2="36" y2="25" />
      </g>

      {/* Brand Text */}
      {/* KALKI - Serif, uppercase, tracked */}
      <text
        x="200"
        y="95"
        fontFamily="var(--font-display)"
        fontSize="52"
        letterSpacing="18"
        dx="9"
        textAnchor="middle"
        fill="currentColor"
        stroke="none"
        fontWeight="400"
      >
        KALKI
      </text>

      {/* FRAGRANCES - Serif, uppercase, tracked */}
      <text
        x="200"
        y="136"
        fontFamily="var(--font-display)"
        fontSize="21"
        letterSpacing="10"
        dx="5"
        textAnchor="middle"
        fill="currentColor"
        stroke="none"
        fontWeight="400"
      >
        FRAGRANCES
      </text>
    </svg>
  );
}

import type { ReactElement } from 'react';

/**
 * Decorative line motifs for placeholder images, drawn on a 100×100 grid.
 * Stroke uses `currentColor` so the motif follows the active theme tokens.
 */
export type PlaceholderMotif = 'cross' | 'flower' | 'dove' | 'candle' | 'wreath';

export const PLACEHOLDER_MOTIFS: Record<PlaceholderMotif, ReactElement> = {
  cross: <path d="M50 18v64M34 36h32" strokeLinecap="round" />,
  flower: (
    <g>
      <circle cx="50" cy="40" r="6" />
      <path d="M50 34c-6-10 6-14 0-4M50 34c6-10-6-14 0-4" />
      <ellipse cx="50" cy="28" rx="6" ry="9" />
      <ellipse cx="50" cy="52" rx="6" ry="9" />
      <ellipse cx="38" cy="40" rx="9" ry="6" />
      <ellipse cx="62" cy="40" rx="9" ry="6" />
      <path
        d="M50 58v26M50 74c-8-2-12-8-12-12 6 0 10 4 12 12zM50 70c8-2 12-8 12-12-6 0-10 4-12 12z"
        strokeLinecap="round"
      />
    </g>
  ),
  dove: (
    <path
      d="M22 56c10 0 18-4 24-12 4-6 10-10 18-10l6-4-2 8c4 6 2 16-6 22-8 6-22 8-34 4l-10 6 4-10c-2-1-1-4 0-4zM46 44c-4-10-12-16-22-18 2 10 8 18 18 22"
      strokeLinejoin="round"
      strokeLinecap="round"
    />
  ),
  candle: (
    <g strokeLinecap="round" strokeLinejoin="round">
      <path d="M50 22c-5 6-5 11 0 14 5-3 5-8 0-14z" />
      <path d="M50 36v6" />
      <rect x="40" y="42" width="20" height="38" rx="2" />
      <path d="M32 80h36" />
    </g>
  ),
  wreath: (
    <g strokeLinecap="round">
      <circle cx="50" cy="50" r="24" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <ellipse
          key={angle}
          cx="50"
          cy="26"
          rx="4"
          ry="8"
          transform={`rotate(${angle} 50 50) rotate(30 50 26)`}
        />
      ))}
      <path d="M44 74l-6 12M56 74l6 12" />
    </g>
  ),
};

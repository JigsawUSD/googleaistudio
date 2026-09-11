import React from 'react';

export interface GoogleIconProps {
  /** The Material Symbols icon name from Google Fonts */
  name: string;
  /** Custom classes (e.g. text color, margin, hover transitions) */
  className?: string;
  /** Fill state: true for filled glyph, false for outlined */
  filled?: boolean;
  /** Font weight: 100 to 700 (default 400) */
  weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700;
  /** Optical sizing: 20, 24, 40, 48 (default 24) */
  opticalSize?: 20 | 24 | 40 | 48;
  /** Font grade: -25, 0, 200 (default 0) */
  grade?: -25 | 0 | 200;
  /** Custom font size in pixels or CSS units (e.g. 18, 24, '1.25rem') */
  size?: number | string;
  /** Optional HTML element ID */
  id?: string;
}

/**
 * GoogleIcon renders icons directly from the Google Fonts Material Symbols API
 * with full variable font optical sizing, weight, and fill controls.
 */
export const GoogleIcon: React.FC<GoogleIconProps> = ({
  name,
  className = '',
  filled = false,
  weight = 400,
  opticalSize = 24,
  grade = 0,
  size,
  id,
}) => {
  const variationStyle: React.CSSProperties = {
    fontVariationSettings: `'FILL' ${filled ? 1 : 0}, 'wght' ${weight}, 'GRAD' ${grade}, 'opsz' ${opticalSize}`,
    ...(size ? { fontSize: typeof size === 'number' ? `${size}px` : size } : {}),
  };

  return (
    <span
      id={id}
      className={`material-symbols-rounded select-none leading-none inline-flex items-center justify-center shrink-0 ${className}`}
      style={variationStyle}
      aria-hidden="true"
    >
      {name}
    </span>
  );
};

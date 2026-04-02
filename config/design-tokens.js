// Earth Modern Design System - Centralized Configuration
export const EARTH_MODERN = {
  // Color Palette
  colors: {
    primary: '#271310',
    primaryFixed: '#ffdad4',
    primaryContainer: '#3e2723',
    secondary: '#735c00',
    secondaryFixed: '#ffe088',
    secondaryContainer: '#fed65b',
    tertiary: '#27130b',
    tertiaryFixed: '#ffdbce',
    tertiaryContainer: '#3e271e',
    surface: '#fefccf',
    surfaceDim: '#dedcb1',
    surfaceBright: '#fefccf',
    surfaceContainerLowest: '#ffffff',
    surfaceContainerLow: '#f8f6c9',
    surfaceContainer: '#f2f0c4',
    surfaceContainerHigh: '#eceabe',
    surfaceContainerHighest: '#e6e5b9',
    onPrimary: '#ffffff',
    onPrimaryContainer: '#ae8d87',
    onSecondary: '#ffffff',
    onSecondaryContainer: '#745c00',
    onSurface: '#1d1d03',
    onBackground: '#1d1d03',
    onError: '#ffffff',
    onErrorContainer: '#ffdad6',
    outline: '#827472',
    outlineVariant: '#d3c3c0',
    inversePrimary: '#e3beb8',
    inverseSurface: '#323214',
    inverseOnSurface: '#f5f3c7'
  },

  // Typography
  typography: {
    headline: {
      family: 'Manrope, sans-serif',
      weights: [400, 700, 800],
      letterSpacing: '-0.02em'
    },
    body: {
      family: 'Be Vietnam Pro, sans-serif',
      weights: [300, 400, 500, 600],
      lineHeight: 1.6
    },
    label: {
      family: 'Manrope, sans-serif',
      size: '0.75rem',
      letterSpacing: '+0.1em',
      transform: 'uppercase'
    }
  },

  // Spacing Scale
  spacing: {
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
    '4xl': '6rem',
    '5xl': '8rem',
    '6xl': '10rem'
  },

  // Border Radius
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    full: '9999px'
  },

  // Shadows
  shadows: {
    editorial: '0 12px 60px rgba(29, 29, 3, 0.06)',
    editorialHover: '0 20px 80px rgba(29, 29, 3, 0.12)',
    ambient: '0 40px 60px rgba(29, 29, 3, 0.06)',
    button: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
  },

  // Transitions
  transitions: {
    fast: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
    normal: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    slow: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    scale: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
  },

  // Breakpoints
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  },

  // Glassmorphism
  glass: {
    background: 'rgba(254, 252, 207, 0.8)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(254, 252, 207, 0.2)'
  },

  // Animation
  animation: {
    pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    bounce: 'bounce 1s infinite',
    fadeIn: 'fadeIn 0.3s ease-in-out',
    slideUp: 'slideUp 0.3s ease-out'
  }
};

// CSS Custom Properties Generator
export function generateCSSVariables() {
  const cssVars = {};
  
  Object.entries(EARTH_MODERN.colors).forEach(([key, value]) => {
    cssVars[`--color-${key.toLowerCase().replace(/([A-Z])/g, '-$1').toLowerCase()}`] = value;
  });
  
  Object.entries(EARTH_MODERN.spacing).forEach(([key, value]) => {
    cssVars[`--spacing-${key}`] = value;
  });
  
  Object.entries(EARTH_MODERN.shadows).forEach(([key, value]) => {
    cssVars[`--shadow-${key}`] = value;
  });
  
  return cssVars;
}

// Utility Functions
export function getColor(name, shade = null) {
  const colorName = name + (shade ? capitalize(shade) : '');
  return EARTH_MODERN.colors[colorName] || null;
}

export function getSpacing(size) {
  return EARTH_MODERN.spacing[size] || EARTH_MODERN.spacing.md;
}

export function getShadow(type) {
  return EARTH_MODERN.shadows[type] || EARTH_MODERN.shadows.editorial;
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

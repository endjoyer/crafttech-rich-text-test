export const CANVAS_DEFAULTS = {
  SHAPE_SIZE: 100,
  MIN_SCALE: 0.1,
  MAX_SCALE: 5,
  SCALE_FACTOR: 1.1,
};

export const SHAPE_DEFAULTS = {
  RECT: {
    width: 100,
    height: 100,
    fill: '#ffffff',
    stroke: '#000000',
    strokeWidth: 2,
  },
  CIRCLE: {
    radius: 50,
    fill: '#ffffff',
    stroke: '#000000',
    strokeWidth: 2,
  },
  TRIANGLE: {
    sides: 3,
    radius: 50,
    fill: '#ffffff',
    stroke: '#000000',
    strokeWidth: 2,
  },
};

export const DEFAULT_SHAPE_SIZE = 250;
export const DEFAULT_FONT_SIZE = 16;
export const DEFAULT_FONT_FAMILY = 'Arial';
export const DEFAULT_TEXT_COLOR = '#000000';
export const DEFAULT_SHAPE_FILL = '#ffffff';
export const DEFAULT_SHAPE_STROKE = '#000000';
export const DEFAULT_SHAPE_STROKE_WIDTH = 2;

export const AVAILABLE_FONTS = [
  'Arial',
  'Times New Roman',
  'Courier New',
  'Georgia',
  'Verdana',
];

export const AVAILABLE_FONT_SIZES = [
  8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 48,
];

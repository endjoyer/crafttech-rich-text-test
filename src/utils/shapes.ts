import { Shape, Point, ShapeType } from '@/types/canvas';
import {
  DEFAULT_SHAPE_SIZE,
  DEFAULT_FONT_SIZE,
  DEFAULT_FONT_FAMILY,
  DEFAULT_TEXT_COLOR,
  DEFAULT_SHAPE_FILL,
  DEFAULT_SHAPE_STROKE,
  DEFAULT_SHAPE_STROKE_WIDTH,
} from '@/constants/canvas';

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

export const createShape = (point: Point, type: ShapeType = 'rect'): Shape => {
  return {
    id: generateId(),
    type,
    x: point.x,
    y: point.y,
    width: DEFAULT_SHAPE_SIZE,
    height: DEFAULT_SHAPE_SIZE / 2.5,
    rotation: 0,
    styles: {
      fill: DEFAULT_SHAPE_FILL,
      stroke: DEFAULT_SHAPE_STROKE,
      strokeWidth: DEFAULT_SHAPE_STROKE_WIDTH,
    },
    text: '',
    textStyles: {
      fontSize: DEFAULT_FONT_SIZE,
      fontFamily: DEFAULT_FONT_FAMILY,
      fill: DEFAULT_TEXT_COLOR,
      align: 'center',
    },
  };
};

export const snapToGrid = (value: number, gridSize: number = 20): number => {
  return Math.round(value / gridSize) * gridSize;
};

export const getShapeCenter = (shape: Shape): Point => {
  return {
    x: shape.x + shape.width / 2,
    y: shape.y + shape.height / 2,
  };
};

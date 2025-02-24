import { Shape, Point } from '@/types/canvas';

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

export const createShape = (
  point: Point,
  type: Shape['type'] = 'rect'
): Shape => {
  return {
    id: generateId(),
    type,
    x: point.x,
    y: point.y,
    width: 200,
    height: 100,
    styles: {
      fill: '#ffffff',
      stroke: '#000000',
      strokeWidth: 2,
    },
    text: '',
    textStyles: {
      fontSize: 16,
      fontFamily: 'Roboto',
      fill: '#000000',
      align: 'center',
    },
    textPosition: {
      x: 0,
      y: 0,
    },
  };
};

export const calculateTextPosition = (shape: Shape): Point => {
  return {
    x: shape.width / 2,
    y: shape.height / 2,
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

export interface Point {
  x: number;
  y: number;
}

export interface ShapeStyles {
  fill: string;
  stroke: string;
  strokeWidth: number;
}

export interface TextStyles {
  fontSize: number;
  fontFamily: string;
  fill: string;
  align: 'left' | 'center' | 'right';
  fontStyle?: string;
  textDecoration?: string;
}

export interface Shape {
  id: string;
  type: 'rect' | 'circle' | 'triangle';
  x: number;
  y: number;
  width: number;
  height: number;
  styles: ShapeStyles;
  text: string;
  textStyles: TextStyles;
  textPosition?: Point;
  textImageUrl?: string;
}

export type Tool = 'cursor' | 'shape';

export interface Transform {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
}

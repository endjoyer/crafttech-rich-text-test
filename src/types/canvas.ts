export type Tool = 'cursor' | 'shape';

export type ShapeType = 'rect' | 'circle' | 'triangle';

export interface Point {
  x: number;
  y: number;
}

export interface TextStyles {
  fontSize: number;
  fontFamily: string;
  fill: string;
  align: 'left' | 'center' | 'right';
}

export interface ShapeStyles {
  fill: string;
  stroke: string;
  strokeWidth: number;
}

export interface Shape {
  id: string;
  type: ShapeType;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  text?: string;
  textImageUrl?: string;
  textStyles: TextStyles;
  styles: ShapeStyles;
}

export interface StageConfig {
  width: number;
  height: number;
  scale: number;
}

export interface EditorConfig {
  fontSize: number;
  fontFamily: string;
  color: string;
  align: 'left' | 'center' | 'right';
  bold: boolean;
  italic: boolean;
  underline: boolean;
}

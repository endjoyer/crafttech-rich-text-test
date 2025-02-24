import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Shape, Point } from '@/types/canvas';

interface CanvasState {
  shapes: Shape[];
  selectedShapeId: string | null;
  stagePosition: Point;
  scale: number;
}

const initialState: CanvasState = {
  shapes: [],
  selectedShapeId: null,
  stagePosition: { x: 0, y: 0 },
  scale: 1,
};

const canvasSlice = createSlice({
  name: 'canvas',
  initialState,
  reducers: {
    addShape: (state, action: PayloadAction<Shape>) => {
      state.shapes.push(action.payload);
    },
    updateShape: (state, action: PayloadAction<Shape>) => {
      const index = state.shapes.findIndex(
        (shape) => shape.id === action.payload.id
      );
      if (index !== -1) {
        state.shapes[index] = action.payload;
      }
    },
    setSelectedShape: (state, action: PayloadAction<string | null>) => {
      state.selectedShapeId = action.payload;
    },
    updateStagePosition: (state, action: PayloadAction<Point>) => {
      state.stagePosition = action.payload;
    },
    updateScale: (state, action: PayloadAction<number>) => {
      state.scale = action.payload;
    },
  },
});

export const {
  addShape,
  updateShape,
  setSelectedShape,
  updateStagePosition,
  updateScale,
} = canvasSlice.actions;

export default canvasSlice.reducer;

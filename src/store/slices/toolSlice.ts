import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Tool } from '../../types/canvas';

interface ToolState {
  currentTool: Tool;
  isEditing: boolean;
}

const initialState: ToolState = {
  currentTool: 'cursor',
  isEditing: false,
};

const toolSlice = createSlice({
  name: 'tool',
  initialState,
  reducers: {
    setTool: (state, action: PayloadAction<Tool>) => {
      state.currentTool = action.payload;
    },
    setEditing: (state, action: PayloadAction<boolean>) => {
      state.isEditing = action.payload;
    },
  },
});

export const { setTool, setEditing } = toolSlice.actions;

export default toolSlice.reducer;

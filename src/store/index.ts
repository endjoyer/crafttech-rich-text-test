import { configureStore } from '@reduxjs/toolkit';
import canvasReducer from './slices/canvasSlice';
import toolReducer from './slices/toolSlice';

export const store = configureStore({
  reducer: {
    canvas: canvasReducer,
    tool: toolReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['canvas/updateShape'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

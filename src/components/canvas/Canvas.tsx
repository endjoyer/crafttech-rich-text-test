import { FC, useRef, useEffect } from 'react';
import { Stage, Layer } from 'react-konva';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import {
  addShape,
  updateStagePosition,
  setSelectedShape,
} from '@/store/slices/canvasSlice';
import { Shape } from '@/components/Shape/Shape';
import { createShape } from '@/utils/shapes';
import { KonvaEventObject } from 'konva/lib/Node';
import { Point } from '@/types/canvas';
import { useWindowSize } from '@/hooks/useWindowSize';
import './Canvas.scss';

export const Canvas: FC = () => {
  const dispatch = useAppDispatch();
  const stageRef = useRef<any>(null);
  const { shapes, stagePosition } = useAppSelector((state) => state.canvas);
  const { currentTool } = useAppSelector((state) => state.tool);
  const windowSize = useWindowSize();

  const handleStageClick = (e: KonvaEventObject<MouseEvent>) => {
    // Если кликнули по пустому месту, снимаем выделение
    if (e.target === e.target.getStage()) {
      dispatch(setSelectedShape(null));
    }
  };

  const handleClick = (e: KonvaEventObject<MouseEvent>) => {
    if (currentTool !== 'shape') return;

    const stage = e.target.getStage();
    if (!stage) return;

    const position = stage.getPointerPosition();
    if (!position) return;

    const stageOffset = stage.absolutePosition();
    const point: Point = {
      x: position.x - stageOffset.x,
      y: position.y - stageOffset.y,
    };

    dispatch(addShape(createShape(point)));
  };

  const handleDragEnd = (e: KonvaEventObject<DragEvent>) => {
    const stage = e.target.getStage();
    if (!stage) return;

    dispatch(
      updateStagePosition({
        x: stage.x(),
        y: stage.y(),
      })
    );
  };

  return (
    <div className="canvas-container">
      <Stage
        width={windowSize.width}
        height={windowSize.height}
        draggable={currentTool === 'cursor'}
        onClick={handleClick}
        onDragEnd={handleDragEnd}
        onMouseDown={handleStageClick}
        ref={stageRef}
        x={stagePosition.x}
        y={stagePosition.y}
      >
        <Layer>
          {shapes.map((shape) => (
            <Shape key={shape.id} shape={shape} />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

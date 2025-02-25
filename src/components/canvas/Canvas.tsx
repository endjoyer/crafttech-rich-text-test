import { FC, useRef } from 'react';
import { Stage, Layer } from 'react-konva';
import Konva from 'konva';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  addShape,
  updateStagePosition,
  updateScale,
} from '../../store/slices/canvasSlice';
import { Shape } from '../shape/Shape';
import { createShape } from '../../utils/shapes';
import { KonvaEventObject } from 'konva/lib/Node';
import { Point, Shape as ShapeType } from '../../types/canvas';
import { useWindowSize } from '../../hooks/useWindowSize';
import './Canvas.scss';

export const Canvas: FC = () => {
  const dispatch = useAppDispatch();
  const stageRef = useRef<Konva.Stage>(null);
  const { shapes, stagePosition } = useAppSelector((state) => state.canvas);
  const { currentTool } = useAppSelector((state) => state.tool);
  const windowSize = useWindowSize();

  const handleClick = (e: KonvaEventObject<MouseEvent>) => {
    if (currentTool !== 'shape') return;

    const stage = e.target.getStage();
    if (!stage) return;

    const position = stage.getPointerPosition();
    if (!position) return;

    const stageOffset = stage.absolutePosition();
    const point: Point = {
      x: (position.x - stageOffset.x) / stage.scaleX(),
      y: (position.y - stageOffset.y) / stage.scaleY(),
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

  const handleWheel = (e: KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault();

    const stage = stageRef.current;
    if (!stage) return;

    const oldScale = stage.scaleX();
    const pointer = stage.getPointerPosition();
    if (!pointer) return;

    const mousePointTo = {
      x: (pointer.x - stage.x()) / oldScale,
      y: (pointer.y - stage.y()) / oldScale,
    };

    const newScale = e.evt.deltaY > 0 ? oldScale * 0.9 : oldScale * 1.1;

    stage.scale({ x: newScale, y: newScale });

    const newPos = {
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
    };

    stage.position(newPos);
    stage.batchDraw();
    dispatch(updateScale(newScale));
  };

  return (
    <div className="canvas-container">
      <Stage
        width={windowSize.width}
        height={windowSize.height}
        draggable={currentTool === 'cursor'}
        onClick={handleClick}
        onDragEnd={handleDragEnd}
        onWheel={handleWheel}
        ref={stageRef}
        x={stagePosition.x}
        y={stagePosition.y}
      >
        <Layer>
          {shapes.map((shape: ShapeType) => (
            <Shape key={shape.id} shape={shape} />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

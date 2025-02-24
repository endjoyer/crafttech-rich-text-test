import { FC, useRef, useCallback } from 'react';
import { Group, Rect, Text, Image, Transformer } from 'react-konva';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { setSelectedShape, updateShape } from '@/store/slices/canvasSlice';
import { setEditing } from '@/store/slices/toolSlice';
import { Shape as ShapeType } from '@/types/canvas';
import { KonvaEventObject } from 'konva/lib/Node';
import useImage from 'use-image';
import { ShapeTransformer } from '../ShapeTransformer/ShapeTransformer';
import { snapToGrid } from '@/utils/shapes';
import './Shape.scss';

interface ShapeProps {
  shape: ShapeType;
}

export const Shape: FC<ShapeProps> = ({ shape }) => {
  const dispatch = useAppDispatch();
  const groupRef = useRef<any>(null);
  const currentTool = useAppSelector((state) => state.tool.currentTool);
  const selectedShapeId = useAppSelector(
    (state) => state.canvas.selectedShapeId
  );
  const isSelected = shape.id === selectedShapeId;
  const [textImage] = useImage(shape.textImageUrl || '');

  const handleClick = useCallback(
    (e: KonvaEventObject<MouseEvent>) => {
      if (currentTool === 'shape') return;
      e.cancelBubble = true;

      dispatch(setSelectedShape(shape.id));
      dispatch(setEditing(true));
    },
    [currentTool, dispatch, shape.id]
  );

  const handleDragEnd = useCallback(
    (e: KonvaEventObject<DragEvent>) => {
      const node = e.target;
      const newPosition = {
        x: snapToGrid(node.x()),
        y: snapToGrid(node.y()),
      };

      dispatch(
        updateShape({
          ...shape,
          x: newPosition.x,
          y: newPosition.y,
        })
      );
    },
    [dispatch, shape]
  );

  const handleTransform = useCallback(() => {
    if (!groupRef.current) return;

    const node = groupRef.current;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();

    node.scaleX(1);
    node.scaleY(1);

    dispatch(
      updateShape({
        ...shape,
        x: node.x(),
        y: node.y(),
        width: Math.max(5, node.width() * scaleX),
        height: Math.max(5, node.height() * scaleY),
        rotation: node.rotation(),
      })
    );
  }, [dispatch, shape]);

  return (
    <>
      <Group
        x={shape.x}
        y={shape.y}
        width={shape.width}
        height={shape.height}
        rotation={shape.rotation}
        onClick={handleClick}
        onTap={handleClick}
        ref={groupRef}
        draggable={currentTool === 'cursor'}
        onDragEnd={handleDragEnd}
        onTransformEnd={handleTransform}
      >
        <Rect
          width={shape.width}
          height={shape.height}
          fill={shape.styles.fill}
          stroke={shape.styles.stroke}
          strokeWidth={shape.styles.strokeWidth}
          cornerRadius={5}
        />

        {shape.textImageUrl && textImage ? (
          <Image
            image={textImage}
            width={shape.width - 20}
            height={shape.height - 20}
            x={10}
            y={10}
          />
        ) : shape.text ? (
          <Text
            text={shape.text}
            width={shape.width - 20}
            height={shape.height - 20}
            x={10}
            y={10}
            fontSize={shape.textStyles.fontSize}
            fontFamily={shape.textStyles.fontFamily}
            fill={shape.textStyles.fill}
            align={shape.textStyles.align}
            verticalAlign="middle"
          />
        ) : null}
      </Group>

      {isSelected && currentTool === 'cursor' && (
        <ShapeTransformer shapeRef={groupRef} />
      )}
    </>
  );
};

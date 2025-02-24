import { FC, useEffect, useRef } from 'react';
import { Transformer } from 'react-konva';

interface ShapeTransformerProps {
  shapeRef: React.RefObject<any>;
}

export const ShapeTransformer: FC<ShapeTransformerProps> = ({ shapeRef }) => {
  const transformerRef = useRef<any>(null);

  useEffect(() => {
    if (!transformerRef.current || !shapeRef.current) return;

    transformerRef.current.nodes([shapeRef.current]);
    transformerRef.current.getLayer().batchDraw();
  }, [shapeRef]);

  return (
    <Transformer
      ref={transformerRef}
      boundBoxFunc={(oldBox, newBox) => {
        // Минимальные размеры фигуры
        const minWidth = 20;
        const minHeight = 20;

        if (newBox.width < minWidth || newBox.height < minHeight) {
          return oldBox;
        }
        return newBox;
      }}
      rotateEnabled={true}
      enabledAnchors={[
        'top-left',
        'top-center',
        'top-right',
        'middle-right',
        'bottom-right',
        'bottom-center',
        'bottom-left',
        'middle-left',
      ]}
      padding={5}
      anchorSize={8}
      anchorCornerRadius={2}
      borderStroke="#2196F3"
      anchorStroke="#2196F3"
      anchorFill="#ffffff"
    />
  );
};

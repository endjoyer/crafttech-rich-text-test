import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import FontFamily from '@tiptap/extension-font-family';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import { Extension } from '@tiptap/core';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { updateShape } from '../../store/slices/canvasSlice';
import { setEditing } from '../../store/slices/toolSlice';
import html2canvas from 'html2canvas';
import './TextEditor.scss';
import {
  AVAILABLE_FONTS,
  DEFAULT_FONT_FAMILY,
  DEFAULT_SHAPE_STROKE_WIDTH,
  DEFAULT_TEXT_COLOR,
} from '../../constants/canvas';

interface FontSizeAttributes {
  size: string;
}

const FontSize = Extension.create({
  name: 'fontSize',

  addAttributes() {
    return {
      size: {
        default: '16px',
        parseHTML: (element: HTMLElement) => element.style.fontSize || '16px',
        renderHTML: (attributes: FontSizeAttributes) => ({
          style: `font-size: ${attributes.size}`,
        }),
      },
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: ['textStyle'],
        attributes: {
          fontSize: {
            default: '16px',
            parseHTML: (element: HTMLElement) => element.style.fontSize,
            renderHTML: (attributes) => ({
              style: `font-size: ${attributes.fontSize}`,
            }),
          },
        },
      },
    ];
  },
});

const FONT_SIZES = [
  '8px',
  '10px',
  '12px',
  '14px',
  '16px',
  '18px',
  '20px',
  '24px',
  '28px',
  '32px',
];

export const TextEditor: FC = () => {
  const dispatch = useAppDispatch();
  const editorRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const selectedShape = useAppSelector((state) => {
    const id = state.canvas.selectedShapeId;
    return state.canvas.shapes.find((shape) => shape.id === id);
  });

  const scale = useAppSelector((state) => state.canvas.scale);
  const stagePosition = useAppSelector((state) => state.canvas.stagePosition);

  useEffect(() => {
    if (selectedShape) {
      const stageEl = document.querySelector('.konvajs-content');
      if (stageEl) {
        const stageRect = stageEl.getBoundingClientRect();

        const scaledX = selectedShape.x * scale;
        const scaledY = selectedShape.y * scale;
        const scaledWidth = selectedShape.width * scale;
        const scaledHeight = selectedShape.height * scale;

        setPosition({
          x: stageRect.left + scaledX + stagePosition.x,
          y: stageRect.top + scaledY + stagePosition.y,
        });
        setDimensions({
          width: scaledWidth,
          height: scaledHeight,
        });
      }
    }
  }, [selectedShape, scale, stagePosition]);

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      FontSize,
      Color,
      FontFamily,
      Underline,
      TextAlign.configure({
        types: ['paragraph'],
        alignments: ['left', 'center', 'right'],
      }),
    ],
    content: selectedShape?.text || '',
    editorProps: {
      attributes: {
        class: 'text-editor__content',
      },
    },
  });

  const handleClose = useCallback(async () => {
    if (!selectedShape || !editorRef.current || !editor) return;

    try {
      const canvas = await html2canvas(editorRef.current, {
        backgroundColor: null,
        logging: false,
        scale: DEFAULT_SHAPE_STROKE_WIDTH,
        useCORS: true,
        onclone: (clonedDoc) => {
          const style = clonedDoc.createElement('style');
          style.innerHTML = `
            * { font-family: ${editor.getAttributes('textStyle').fontFamily || DEFAULT_FONT_FAMILY} !important; }
          `;
          clonedDoc.head.appendChild(style);
        },
      });

      const dataUrl = canvas.toDataURL('image/png');

      const newShape = {
        ...selectedShape,
        text: editor.getHTML(),
        textImageUrl: dataUrl,
      };

      dispatch(updateShape(newShape));
      dispatch(setEditing(false));
    } catch (error) {
      console.error('Failed to convert text to image:', error);
    }
  }, [dispatch, editor, selectedShape]);

  const updateContent = useCallback(() => {
    if (!selectedShape || !editor) return;

    const newShape = {
      ...selectedShape,
      text: editor.getHTML(),
    };
    dispatch(updateShape(newShape));
  }, [dispatch, editor, selectedShape]);

  if (!selectedShape || !editor) return null;

  return (
    <>
      <div className="text-editor__toolbar">
        <select
          value={editor.getAttributes('textStyle').fontSize || '16px'}
          onChange={(e) => {
            editor
              .chain()
              .focus()
              .setMark('textStyle', { fontSize: e.target.value })
              .run();
          }}
        >
          {FONT_SIZES.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>

        <select
          value={
            editor.getAttributes('textStyle').fontFamily || DEFAULT_FONT_FAMILY
          }
          onChange={(e) =>
            editor.chain().focus().setFontFamily(e.target.value).run()
          }
        >
          {AVAILABLE_FONTS.map((font) => (
            <option key={font} value={font}>
              {font}
            </option>
          ))}
        </select>

        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'is-active' : ''}
        >
          B
        </button>

        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'is-active' : ''}
        >
          I
        </button>

        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive('underline') ? 'is-active' : ''}
        >
          U
        </button>

        <button
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}
        >
          ←
        </button>

        <button
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={
            editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''
          }
        >
          ↔
        </button>

        <button
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}
        >
          →
        </button>

        <input
          type="color"
          value={editor.getAttributes('textStyle').color || DEFAULT_TEXT_COLOR}
          onChange={(e) =>
            editor.chain().focus().setColor(e.target.value).run()
          }
        />

        <button className="text-editor__close" onClick={handleClose}>
          Применить
        </button>

        <button
          className="text-editor__header-close"
          onClick={() => dispatch(setEditing(false))}
        >
          ×
        </button>
      </div>
      <div
        className="text-editor"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: `${dimensions.width}px`,
          height: `${dimensions.height}px`,
          transform: `scale(1)`,
          transformOrigin: 'top left',
        }}
      >
        <div className="text-editor__container" ref={editorRef}>
          <EditorContent editor={editor} onChange={updateContent} />
        </div>
      </div>
    </>
  );
};

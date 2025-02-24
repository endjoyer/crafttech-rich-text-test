import { FC, useCallback, useRef } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import FontFamily from '@tiptap/extension-font-family';
import TextAlign from '@tiptap/extension-text-align';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { updateShape } from '@/store/slices/canvasSlice';
import { setEditing } from '@/store/slices/toolSlice';
import { toPng } from 'html-to-image';
import './TextEditor.scss';

const FONT_SIZES = [8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 48, 72];
const FONT_FAMILIES = [
  'Arial',
  'Times New Roman',
  'Courier New',
  'Georgia',
  'Verdana',
];

export const TextEditor: FC = () => {
  const dispatch = useAppDispatch();
  const editorRef = useRef<HTMLDivElement>(null);

  const selectedShape = useAppSelector((state) => {
    const id = state.canvas.selectedShapeId;
    return state.canvas.shapes.find((shape) => shape.id === id);
  });

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Color,
      FontFamily,
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
    if (!selectedShape || !editorRef.current) return;

    try {
      // Конвертируем содержимое редактора в изображение
      const dataUrl = await toPng(editorRef.current, {
        backgroundColor: 'transparent',
      });

      const newShape = {
        ...selectedShape,
        text: editor?.getHTML() || '',
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
    <div className="text-editor">
      <div className="text-editor__toolbar">
        <select
          value={editor.getAttributes('textStyle').fontSize || '16'}
          onChange={(e) =>
            editor.chain().focus().setFontSize(e.target.value).run()
          }
        >
          {FONT_SIZES.map((size) => (
            <option key={size} value={size}>
              {size}px
            </option>
          ))}
        </select>

        <select
          value={editor.getAttributes('textStyle').fontFamily || 'Arial'}
          onChange={(e) =>
            editor.chain().focus().setFontFamily(e.target.value).run()
          }
        >
          {FONT_FAMILIES.map((font) => (
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
          value={editor.getAttributes('textStyle').color || '#000000'}
          onChange={(e) =>
            editor.chain().focus().setColor(e.target.value).run()
          }
        />

        <button className="text-editor__close" onClick={handleClose}>
          Применить
        </button>
      </div>

      <div className="text-editor__container" ref={editorRef}>
        <EditorContent editor={editor} onChange={updateContent} />
      </div>
    </div>
  );
};

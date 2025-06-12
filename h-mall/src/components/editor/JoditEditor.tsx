import JoditEditor from 'jodit-react';
import { useRef, useMemo } from 'react';

type EditorProps = {
  value: string;
  onChange: (value: string) => void;
  config?: Record<string, any>;
};

export default function EditorJodit({ value, onChange, config }: EditorProps) {
  const editor = useRef(null);

  const mergedConfig = useMemo(
    () => ({
      toolbarAdaptive: false,
      readonly: false,
      placeholder: config?.placeholder || '',
      buttons: config?.buttons || [
        'font',
        'fontsize',
        'brush',
        'align',
        '|',
        'bold',
        'italic',
        'underline',
        'strikethrough',
        'eraser',
        '|',
        'superscript',
        'subscript',
        'ul',
        'ol',
        '|',
        'outdent',
        'indent',
        'paragraph',
        'table',
        'hr',
        '|',
        'link',
        'image',
        'video',
        '|',
        'selectall',
        'find',
        'source',
        'fullsize',
        'preview',
        'print',
        'undo',
        'redo',
      ],
      ...config,
    }),
    [config]
  );

  return (
    <JoditEditor
      ref={editor}
      value={value}
      config={mergedConfig}
      onBlur={onChange}
      tabIndex={1}
    />
  );
}

import dynamic from 'next/dynamic';
import { useRef, useMemo } from 'react';

type EditorConfig = Partial<{
  toolbarAdaptive: boolean;
  readonly: boolean;
  placeholder: string;
  buttons: string[];
  [key: string]: unknown; // 기타 옵션...
}>;

type EditorProps = {
  value: string;
  onChange: (value: string) => void;
  config?: EditorConfig;
};

const JoditEditor = dynamic(
  () => import('jodit-react').then((mod) => mod.default),
  { ssr: false }
);

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

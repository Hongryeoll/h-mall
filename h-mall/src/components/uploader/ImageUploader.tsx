import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { XCircleIcon } from '@heroicons/react/24/solid';

interface Props {
  files: (File | string)[];
  previewUrls: string[];
  onFileSelect: (files: (File | string)[]) => void;
  multiple?: boolean;
}

export default function ImageUploader({
  files,
  previewUrls,
  onFileSelect,
  multiple = false,
}: Props) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles = [...files, ...acceptedFiles];
      onFileSelect(newFiles);
    },
    [files, onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'] },
    multiple,
  });

  const handleRemove = (idx: number) => () => {
    const updatedFiles = files.filter((_, i) => i !== idx);
    onFileSelect(updatedFiles);
  };

  return (
    <div className="flex flex-col gap-3">
      <div
        {...getRootProps()}
        className="border border-hr-gray-30 rounded-md p-4 text-center cursor-pointer bg-hr-light hover:bg-hr-gray-10 transition"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>이미지를 여기에 드롭하세요...</p>
        ) : (
          <p>여기를 클릭하거나 드래그해서 이미지를 업로드하세요</p>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mt-2">
        {previewUrls.map((url, idx) => (
          <div
            key={idx}
            className="relative w-24 h-24 rounded-lg overflow-hidden border border-hr-gray-20 bg-hr-gray-5 shadow-sm"
          >
            <img
              src={url}
              alt={`미리보기${idx + 1}`}
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={handleRemove(idx)}
              className="absolute top-1 right-1 p-1 bg-hr-white rounded-full shadow hover:bg-hr-gray-10 transition z-10"
              aria-label="이미지 제거"
            >
              <XCircleIcon className="w-5 h-5 text-hr-danger-default hover:text-hr-danger-hover" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

import { useRef } from 'react';
import { XCircleIcon } from '@heroicons/react/24/solid';

type Props = {
  onFileSelect: (files: File[]) => void;
  files: File[];
  previewUrls: string[];
  multiple?: boolean;
};

export default function ImageUploader({
  onFileSelect,
  files,
  previewUrls,
  multiple = false,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files ?? []);
    onFileSelect([...files, ...newFiles]);
  };

  const handleRemove = (idx: number) => (e: React.MouseEvent) => {
    e.stopPropagation();
    const updatedFiles = files.filter((_, i) => i !== idx);
    onFileSelect(updatedFiles);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <label>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          multiple={multiple}
          className="block w-full text-sm text-hr-gray-60
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-hr-semi-bold
            file:bg-hr-light file:text-hr-gray-60
            hover:file:bg-hr-gray-10
            transition cursor-pointer"
        />
      </label>

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

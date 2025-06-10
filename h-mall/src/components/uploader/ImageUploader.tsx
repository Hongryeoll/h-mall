'use client';

import { useEffect, useRef, useState } from 'react';
import { XCircleIcon } from '@heroicons/react/24/solid';

type Props = {
  onFileSelect: (file: File | null) => void;
  previewUrl: string | null;
};

export default function ImageUploader({ onFileSelect, previewUrl }: Props) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [localPreview, setLocalPreview] = useState<string | null>(previewUrl);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    setLocalPreview(objectUrl);
    onFileSelect(file);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLocalPreview(null);
    onFileSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  useEffect(() => {
    if (previewUrl) {
      setLocalPreview(previewUrl);
    }
  }, [previewUrl]);

  return (
    <div className="flex flex-col gap-3">
      <label className="block">
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="block w-full text-sm text-hr-gray-60
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-hr-semi-bold
            file:bg-hr-light file:text-hr-gray-60
            hover:file:bg-hr-gray-10
            transition cursor-pointer"
        />
      </label>

      {localPreview && (
        <div className="relative w-40 h-40 rounded-lg overflow-hidden border border-hr-gray-20 shadow-sm bg-hr-gray-5 cursor-pointer">
          <img
            src={localPreview}
            alt="이미지 미리보기"
            className="w-full h-full object-cover transition hover:opacity-80"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-1 right-1 p-1 bg-hr-white rounded-full shadow hover:bg-hr-gray-10 transition z-10"
            aria-label="이미지 제거"
          >
            <XCircleIcon className="w-5 h-5 text-hr-danger-default hover:text-hr-danger-hover" />
          </button>
        </div>
      )}
    </div>
  );
}

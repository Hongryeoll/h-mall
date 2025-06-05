'use client';

import { useRef, useState } from 'react';
import { XCircleIcon } from '@heroicons/react/24/solid';

type Props = {
  value: string | null;
  onChange: (value: string | null) => void;
};

export default function ImageUploader({ value, onChange }: Props) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    onChange(imageUrl);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation(); // ✅ 프리뷰 클릭 이벤트 방해 방지
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <label className="block">
        <span className="block mb-1 text-hr-gray-60 text-hr-b4 font-hr-semi-bold">
          이미지 업로드
        </span>
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

      {value && (
        <>
          <div
            className="relative w-40 h-40 rounded-lg overflow-hidden border border-hr-gray-20 shadow-sm bg-hr-gray-5 cursor-pointer"
            onClick={() => setIsPreviewOpen(true)}
          >
            <img
              src={value}
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

          {isPreviewOpen && (
            <div
              className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center"
              onClick={() => setIsPreviewOpen(false)}
            >
              <img
                src={value}
                alt="확대 이미지"
                className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-lg"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}

import { ProductFormProps } from '@/types/products';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import ImageUploader from '../uploader/ImageUploader';

type Props = {
  register: UseFormRegister<ProductFormProps>;
  errors: FieldErrors<ProductFormProps>;
  previewThumbnail: string | null;
  previewDetail: string | null;
  onSelectThumbnail: (file: File | null) => void;
  onSelectDetail: (file: File | null) => void;
};

export default function ProductDetailForm({
  register,
  errors,
  previewThumbnail,
  previewDetail,
  onSelectThumbnail,
  onSelectDetail,
}: Props) {
  return (
    <>
      <div>
        <label className="block text-hr-b4 font-hr-semi-bold text-hr-gray-60">
          썸네일 이미지
        </label>
        <ImageUploader
          previewUrl={previewThumbnail}
          onFileSelect={onSelectThumbnail}
        />
        {errors.images && (
          <p className="text-hr-danger-default text-sm">
            {errors.images.message}
          </p>
        )}
      </div>
      <div>
        <label className="block text-hr-b4 font-hr-semi-bold text-hr-gray-60">
          상세페이지 이미지
        </label>
        <ImageUploader
          previewUrl={previewDetail}
          onFileSelect={onSelectDetail}
        />
        {errors.detail_image && (
          <p className="text-hr-danger-default text-sm">
            {errors.detail_image.message}
          </p>
        )}
      </div>
      <textarea
        {...register('description')}
        placeholder="설명"
        className="w-full border border-hr-gray-30 bg-hr-white text-hr-gray-60 text-sm rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-hr-purple-default transition"
      />
    </>
  );
}

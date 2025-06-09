import { ProductFormProps } from '@/types/products';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import ImageUploader from '../uploader/ImageUploader';

type Props = {
  register: UseFormRegister<ProductFormProps>;
  previewUrl: string | null;
  onFileSelect: (file: File | null) => void;
  errors: FieldErrors<ProductFormProps>;
};

export default function ProductDetailForm({
  register,
  previewUrl,
  onFileSelect,
  errors,
}: Props) {
  return (
    <>
      <ImageUploader previewUrl={previewUrl} onFileSelect={onFileSelect} />
      {errors.image_url && (
        <p className="text-hr-danger-default text-sm">
          {errors.image_url.message}
        </p>
      )}
      <textarea
        {...register('description')}
        placeholder="설명"
        className="w-full border border-hr-gray-30 bg-hr-white text-hr-gray-60 text-sm rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-hr-purple-default transition"
      />
    </>
  );
}

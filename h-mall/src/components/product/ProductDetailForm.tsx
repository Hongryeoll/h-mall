import { ProductFormProps } from '@/types/products';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import ImageUploader from '../uploader/ImageUploader';

type Props = {
  register: UseFormRegister<ProductFormProps>;
  errors: FieldErrors<ProductFormProps>;
  productImage: File[];
  detailImage: File[];
  previewProduct: string[];
  previewDetail: string[];
  onSelectProduct: (file: File[]) => void;
  onSelectDetail: (file: File[]) => void;
};

export default function ProductDetailForm({
  register,
  errors,
  productImage,
  detailImage,
  previewProduct,
  previewDetail,
  onSelectProduct,
  onSelectDetail,
}: Props) {
  return (
    <>
      <div>
        <label className="block text-hr-b4 font-hr-semi-bold text-hr-gray-60">
          상품 이미지
        </label>
        <ImageUploader
          multiple
          files={productImage}
          previewUrls={previewProduct}
          onFileSelect={onSelectProduct}
        />
        {errors.product_images && (
          <p className="text-hr-danger-default text-sm">
            {errors.product_images.message}
          </p>
        )}
      </div>
      <div>
        <label className="block text-hr-b4 font-hr-semi-bold text-hr-gray-60">
          상세페이지 이미지
        </label>
        <ImageUploader
          multiple
          files={detailImage}
          previewUrls={previewDetail}
          onFileSelect={onSelectDetail}
        />
        {errors.detail_images && (
          <p className="text-hr-danger-default text-sm">
            {errors.detail_images.message}
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

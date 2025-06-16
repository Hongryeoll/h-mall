import { ProductFormProps } from '@/types/products';
import { FieldErrors } from 'react-hook-form';
import ImageUploader from '@/components/uploader/ImageUploader';
import EditorJodit from '@/components/editor/JoditEditor';

type Props = {
  errors: FieldErrors<ProductFormProps>;
  productImage: (File | string)[];
  detailImage: (File | string)[];
  previewProduct: string[];
  previewDetail: string[];
  onSelectProduct: (file: (File | string)[]) => void;
  onSelectDetail: (file: (File | string)[]) => void;
  description: string;
  setDescription: (value: string) => void;
};

export default function ProductDetailForm({
  errors,
  productImage,
  detailImage,
  previewProduct,
  previewDetail,
  onSelectProduct,
  onSelectDetail,
  description,
  setDescription,
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

      <EditorJodit
        value={description}
        onChange={setDescription}
        config={{ placeholder: '설명' }}
      />
    </>
  );
}

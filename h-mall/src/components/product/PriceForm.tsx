import { ProductFormProps } from '@/types/products';
import { FieldErrors, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { HrInput } from '../common/HrInput';
import { useEffect } from 'react';

type Props = {
  errors: FieldErrors<ProductFormProps>;
  watch: UseFormWatch<ProductFormProps>;
  setValue: UseFormSetValue<ProductFormProps>;
};

export default function PriceForm({ watch, setValue, errors }: Props) {
  const price = watch('price');
  const discountRate = watch('discount_rate');

  useEffect(() => {
    const p = Number(price);
    const d = Number(discountRate);
    if (!isNaN(p) && !isNaN(d)) {
      const final = Math.floor(p * (1 - d / 100));
      setValue('final_price', final);
    }
  }, [price, discountRate, setValue]);
  return (
    <>
      <HrInput name="price" placeholder="가격" required size="md" />
      {errors.price && (
        <p className="text-hr-danger-default text-sm">{errors.price.message}</p>
      )}

      <HrInput
        name="discount_rate"
        placeholder="할인율 (%)"
        required
        size="md"
      />
      {errors.discount_rate && (
        <p className="text-hr-danger-default text-sm">
          {errors.discount_rate.message}
        </p>
      )}

      <HrInput
        name="final_price"
        placeholder="할인 후 가격"
        size="md"
        disabled
      />
    </>
  );
}

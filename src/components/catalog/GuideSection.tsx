'use client';

import DOMPurify from 'isomorphic-dompurify';
import { ProductFormProps } from '@/types/products';

interface Props {
  id: string;
  product: ProductFormProps;
}

export default function GuideSection({ id, product: { description } }: Props) {
  const cleanHtml = description
    ? DOMPurify.sanitize(description)
    : '<p>등록된 안내가 없습니다.</p>';

  return (
    <>
      <div className="p-6">
        <h2 className="mb-4 text-hr-h4 font-hr-bold text-hr-gray-90">
          상품안내
        </h2>
        <section id={id} className="prose prose-lg prose-blue max-w-none">
          <div dangerouslySetInnerHTML={{ __html: cleanHtml }} />
        </section>
      </div>
    </>
  );
}

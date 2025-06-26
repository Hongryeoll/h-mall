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
    <section id={id} className="prose prose-lg prose-blue max-w-none px-6 py-8">
      <div dangerouslySetInnerHTML={{ __html: cleanHtml }} />
    </section>
  );
}

// src/app/category/list/page.tsx
// import ProductGrid from '@/components/category/ProductGrid'

type Props = {
  searchParams: {
    category?: string;
    section?: string;
  };
};

export default function CategoryListPage({ searchParams }: Props) {
  const category = searchParams.category;
  const section = searchParams.section;

  // if (!category || !section) {
  //   return <p>잘못된 접근입니다.</p>;
  // }

  return (
    <div className="flex gap-8 px-4 max-w-screen-xl mx-auto mt-8">
      <div className="flex-1 space-y-6">
        {/* <ProductGrid category={category} section={section} /> */}
      </div>
    </div>
  );
}

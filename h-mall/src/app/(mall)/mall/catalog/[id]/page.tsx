import ProductCatalogInfo from '@/components/catalog/ProductCatalogInfo';
import { getProductById } from '@/actions/product/product.action';
import { ProductFormProps } from '@/types/products';

type Params = {
  params: Promise<{ id: string }>;
};

export default async function CatalogPage({ params }: Params) {
  const { id } = await params;
  const product: ProductFormProps = await getProductById(id);

  return <ProductCatalogInfo product={product} />;
}

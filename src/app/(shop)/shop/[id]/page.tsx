'use client';

import { useProductById } from '@/hooks/useProducts';
import { useParams } from 'next/navigation';

const ProductPage = () => {
  const params = useParams();
  const id = params?.id as string;

  const { data, isLoading, isError } = useProductById(id);

  if (isLoading) return <div>Still Loading...</div>;
  if (isError) return <div>Got Error...</div>;

  return <div>{data.product.name}</div>;
};

export default ProductPage;

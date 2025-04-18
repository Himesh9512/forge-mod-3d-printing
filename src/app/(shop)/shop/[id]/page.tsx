'use client';

import { useProductById } from '@/hooks/useProducts';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';

const ProductPage = () => {
  const params = useParams();
  const id = params?.id as string;

  const { data, error, isLoading, isError } = useProductById(id);

  if (isLoading) return <div>Still Loading...</div>;
  if (isError) {
    toast.error(error.message);
    return <div>Error....</div>;
  }

  return <div>{data.product.name}</div>;
};

export default ProductPage;

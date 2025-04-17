'use client';

import { useProducts } from '@/hooks/useProducts';
import Product from '@/types/product';
import Link from 'next/link';
import { useState } from 'react';

const Shop = () => {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, isError } = useProducts(page, limit);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading products</div>;

  return (
    <div>
      <ul>
        {data.products.map((product: Product) => (
          <li key={product._id}>
            <Link href={`shop/${product._id}`}>{product.name}</Link>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex gap-2">
        <button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
          Prev
        </button>
        <span>Page {page}</span>
        <button
          onClick={() => setPage((p) => (data.totalPages && p < data.totalPages ? p + 1 : p))}
          disabled={page >= data.totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Shop;

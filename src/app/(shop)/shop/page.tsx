'use client';

import { useProducts } from '@/hooks/useProducts';
import Product from '@/types/product';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';
import { Heart } from 'lucide-react'; // Icon

const Shop = () => {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, error, isLoading, isError } = useProducts(page, limit);

  if (isLoading) return <div className="mt-10 text-center text-white">Loading...</div>;
  if (isError) {
    toast.error(error.message);
    return <div className="text-red-500">Error...</div>;
  }

  return (
    <div className="min-h-screen bg-black px-4 py-10">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data.products.map((product: Product) => (
          <div key={product._id} className="flex flex-col overflow-hidden rounded-3xl bg-[#e0e0e0] shadow-lg">
            {/* Product Image Placeholder */}
            <div className="relative flex h-64 items-start justify-end bg-gray-300 p-3">
              <Heart size={20} className="text-black" />
            </div>

            {/* Product Info */}
            <div className="rounded-b-2xl border-t border-black bg-white p-4">
              <p className="font-semibold text-black">{product.name}</p>
              <p className="text-lg font-bold text-black">50.0$</p>
              <div className="mt-3 flex items-center justify-between gap-2">
                <a
                  href={`shop/${product._id}`}
                  className="rounded-full bg-yellow-400 px-4 py-1 text-sm font-bold text-black hover:bg-yellow-300"
                >
                  Buy
                </a>
                <Link href={`shop/${product._id}`} className="text-[10px] text-gray-700 underline">
                  Add To Cart
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-10 flex justify-center gap-4 text-white">
        <button
          className="rounded bg-gray-700 px-4 py-2 disabled:opacity-50"
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          Prev
        </button>
        <span>Page {page}</span>
        <button
          className="rounded bg-gray-700 px-4 py-2 disabled:opacity-50"
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

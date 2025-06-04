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

  if (isLoading) return <div className="text-white text-center mt-10">Loading...</div>;
  if (isError) {
    toast.error(error.message);
    return <div className="text-red-500">Error...</div>;
  }

  return (
    <div className="min-h-screen bg-black px-4 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.products.map((product: Product) => (
          <div
            key={product._id}
            className="bg-[#e0e0e0] rounded-3xl overflow-hidden shadow-lg flex flex-col"
          >
            {/* Product Image Placeholder */}
            <div className="relative h-64 bg-gray-300 flex items-start justify-end p-3">
              <Heart size={20} className="text-black" />
            </div>

            {/* Product Info */}
            <div className="p-4 border-t border-black bg-white rounded-b-2xl">
              <p className="font-semibold text-black">{product.name}</p>
              <p className="text-lg font-bold text-black">50.0$</p>
              <div className="mt-3 flex items-center justify-between gap-2">
                <a  href={`shop/${product._id}`}  className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-1 px-4 rounded-full text-sm">
                  Buy
                </a>
                <Link
                  href={`shop/${product._id}`}
                  className="text-[10px] underline text-gray-700"
                >
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
          className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50"
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          Prev
        </button>
        <span>Page {page}</span>
        <button
          className="px-4 py-2 bg-gray-700 rounded disabled:opacity-50"
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

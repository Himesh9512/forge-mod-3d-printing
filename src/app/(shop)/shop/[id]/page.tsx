'use client';

import { useProductById } from '@/hooks/useProducts';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';
import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';

const ProductPage = () => {
  const datareview = [
    {
      name: 'Khalid Bou-Rabee',
      title: 'Founder, Harambe System',
      image: '/b4e5f323d5e24db4f8e6d40b5ba946879a67f314.png',
      quote: `Forgemod has been a joy to work with. They reply promptly to support requests and have done a stellar job with every project I have given them. When it comes to quality manufacturing, I highly recommend you try Forgemod first.`,
    },
    {
      name: 'Wolfgang Schröppel',
      title: 'Equipment Development Manager',
      image: '/e7c0ae6c592af716358bacefc147310d691e84b7.png',
      quote: `Forgemod provides immediate pricing so you can decide on the spot what material and finish you want to choose. The service is always flawless and prompt.`,
    },
    {
      name: 'Nikk Wong',
      title: 'Engineer, Juni',
      image: '/e6f3af5995a14a4cd7569c4385ff1ec756e52ab2.png', // Replace with actual image path
      quote: `I was spending weeks jumping from website to website trying to find vendors who could quickly deliver affordable & durable prototypes. After finding Forgemod I never had to look anywhere else.`,
    },
  ];

  const params = useParams();
  const id = params?.id as string;

  const { data, error, isLoading, isError } = useProductById(id);
  

  if (isLoading)
    return <div className="text-white text-center mt-10">Still Loading...</div>;
  if (isError) {
    toast.error(error.message);
    return <div className="text-red-500">Error...</div>;
  }

  const product = data.product;

  return (
    <div className="bg-black text-white min-h-screen px-6 py-10">
      {/* Product Top Section */}
      <div className="grid md:grid-cols-2 gap-10">
        {/* Left: Product Image + Thumbnails */}
        <div>
          <div className="bg-[#e0e0e0] rounded-3xl p-6 relative">
            {/* Main Image */}
            <Image
              src={product.imageUrl || '/placeholder.png'}
              alt={product.name}
              width={600}
              height={600}
              className="rounded-2xl object-contain mx-auto"
            />
            {/* Right Arrow Icon */}
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full">
              ❯
            </div>
          </div>

          {/* Thumbnails */}
          <div className="mt-4 grid grid-cols-5 gap-2 items-center">
            <button className="bg-white text-black font-semibold py-2 text-xs rounded-md col-span-1">
              3D View
            </button>
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="bg-[#e0e0e0] rounded-md p-1 aspect-square flex items-center justify-center"
              >
                <Image
                  src={product.imageUrl || '/placeholder.png'}
                  alt={`thumb-${i}`}
                  width={60}
                  height={60}
                  className="object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <h2 className="text-xl text-gray-300 mb-4">Description of product</h2>
          <p className="text-sm text-gray-300 mb-6 leading-relaxed">
            {product.description || `Lorem ipsum dolor sit amet, consectetur adipiscing elit...`}
          </p>

          {/* Price and Buttons */}
          <div className="flex items-center gap-4 mb-10">
            <span className="text-2xl font-bold text-white">${product.price}</span>
            <button className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-2 px-6 rounded-full text-sm">
              Buy
            </button>
            <button className="bg-white hover:bg-gray-100 text-black font-bold py-2 px-4 rounded-full text-sm flex items-center gap-1">
              <ShoppingCart size={16} />
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Bottom: Specifications */}
      <div className="mt-12">
        <h1 className="text-2xl font-bold mb-4">Specifications</h1>
        <p className="text-sm text-gray-300 leading-relaxed max-w-4xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...
        </p>
      </div>

      <div className="mt-12">
        <h1 className="text-2xl font-bold mb-4">Review</h1>
          <section className="bg-black px-6 py-16">
            <div className="bg-black px-4 py-12 sm:px-6 lg:px-20">
              <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {datareview.map((testimonial, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center rounded-3xl bg-white p-6 text-center shadow-md"
                  >
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="mb-4 h-16 w-16 rounded-full object-cover"
                    />
                    <div className="font-semibold text-black">{testimonial.name}</div>
                    <div className="mb-4 text-sm text-gray-600">{testimonial.title}</div>
                    <p className="text-sm text-black">"{testimonial.quote}"</p>
                  </div>
                ))}
              </div>
            </div>
        </section>
      </div>
    </div>
  );
};

export default ProductPage;

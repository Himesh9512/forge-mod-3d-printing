'use client';

import axios from 'axios';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

const CheckoutSession = () => {
  const params = useParams();
  const router = useRouter();

  const canceled = params?.canceled;
  if (canceled) {
    console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
  }

  const handleCheckout = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/checkout-sessions', {
        products: [
          {
            stripeId: 'prod_Rzlr8ojmmNFLUH',
            quantity: 4,
          },
          {
            stripeId: 'prod_Rzlr8ojmmNFLUH',
            quantity: 4,
          },
        ],
      });

      if (response.status === 200) {
        router.push(response.data.url);
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      throw error;
    }
  };

  return (
    <form onSubmit={handleCheckout} method="POST">
      <section>
        <button type="submit" role="link">
          Checkout
        </button>
      </section>
    </form>
  );
};

export default CheckoutSession;

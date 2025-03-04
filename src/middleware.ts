import { authMiddleware } from './middleware/authMiddleware';
import { adminMiddleware } from './middleware/adminMiddleware';
import { NextRequest, NextResponse } from 'next/server';

const openRoutes = new Set([
  'GET /api/products',
  'GET /api/products/:productId',
  'GET /api/categories',
  'GET /api/categories/:categoryId',
  'GET /api/products/:productId/reviews',
  'GET /api/products/:productId/reviews/:reviewId',
  'POST /api/checkout_sessions',
  'POST /api/auth/register',
]);
const userRoutes = new Set([
  'POST /api/products/:productId/reviews',
  'PUT /api/products/:productId/reviews/:reviewId',
  'DELETE /api/products/:productId/reviews/:reviewId',
  'GET /api/print-requests',
  'POST /api/print-requests',
  'GET /api/print-requests/:printRequestId',
  'PUT /api/print-requests/:printRequestId',
]);
const adminRoutes = new Set([
  'POST /api/products',
  'PUT /api/products/:productId',
  'DELETE /api/products/:productId',
  'POST /api/categories',
  'PUT /api/categories/:categoryId',
  'DELETE /api/categories/:categoryId',
  'DELETE /api/print-requests/:printRequestId',
]);

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const method = req.method;
  const requestKey = `${method} ${pathname}`;

  if (openRoutes.has(requestKey)) {
    return NextResponse.next();
  }

  if (userRoutes.has(requestKey)) {
    const authResponse = await authMiddleware(req);

    if (authResponse.status !== 200) {
      return authResponse;
    }
  }

  if (adminRoutes.has(requestKey)) {
    const adminResponse = await adminMiddleware(req);

    if (adminResponse.status !== 200) {
      return adminResponse;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};

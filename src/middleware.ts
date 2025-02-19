// import { authMiddleware } from './middleware/authMiddleware';
// import { adminMiddleware } from './middleware/adminMiddleware';
// import { NextRequest, NextResponse } from 'next/server';

// export async function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl;

//   if (pathname.startsWith('/api') || pathname.startsWith('/')) {
//     const authResponse = await authMiddleware(req);

//     if (authResponse.status !== 200) {
//       return authResponse;
//     }
//   }

//   if (pathname.startsWith('/api')) {
//     const adminResponse = await adminMiddleware(req);

//     if (adminResponse.status !== 200) {
//       return adminResponse;
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: '/api/:path*',
// };

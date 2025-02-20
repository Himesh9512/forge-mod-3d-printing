// import { NextAuthOptions } from 'next-auth';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
// import clientPromise from './mongoAdapter';
// import User from '@/models/User';
// import bcrypt from 'bcryptjs';
// import { connectDB } from '@/config/db';

// export const authOptions: NextAuthOptions = {
//   adapter: MongoDBAdapter(clientPromise),
//   providers: [
//     CredentialsProvider({
//       name: 'Email and Password',
//       credentials: {
//         email: { label: 'Email', type: 'email', required: true },
//         password: { label: 'Password', type: 'password', required: true },
//       },
//       async authorize(credentials) {
//         await connectDB();

//         if (!credentials?.email || !credentials.password) return null;

//         const user = await User.findOne({ email: credentials.email });
//         if (!user) return null;

//         const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
//         if (!isPasswordCorrect) return null;

//         return { id: user._id, email: user.email };
//       },
//     }),
//   ],
//   session: {
//     strategy: 'jwt',
//   },
//   pages: {
//     signIn: '/login',
//     error: '/login', // Redirect to login on errors
//   },
//   secret: process.env.AUTH_SECRET,
// };
import { NextAuthOptions, User as NextAuthUser } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from './mongoAdapter';
import User, { IUser } from '@/models/User';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/config/db';
import { JWT } from 'next-auth/jwt';
import { Session } from 'next-auth';
import { AdapterUser } from 'next-auth/adapters';

// Extend JWT & Session types
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      role: string;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: string;
  }
}

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: 'Email and Password',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials?: Record<'email' | 'password', string>) {
        if (!credentials?.email || !credentials.password) {
          throw new Error('Missing email or password');
        }

        await connectDB();
        const user: IUser | null = await User.findOne({ email: credentials.email });

        if (!user || !user.password) {
          throw new Error('Invalid credentials');
        }

        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordCorrect) {
          throw new Error('Invalid credentials');
        }

        return {
          id: user._id,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: NextAuthUser | AdapterUser }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          role: (user as IUser).role || 'user', // Handle cases where role might be missing
        };
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  secret: process.env.AUTH_SECRET,
};

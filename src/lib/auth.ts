import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from './mongoAdapter';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/config/db';

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: 'Email and Password',
      credentials: {
        email: { label: 'Email', type: 'email', required: true },
        password: { label: 'Password', type: 'password', required: true },
      },
      async authorize(credentials) {
        await connectDB();

        if (!credentials?.email || !credentials.password) return null;

        const user = await User.findOne({ email: credentials.email });
        if (!user) return null;

        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordCorrect) return null;

        return { id: user._id, email: user.email };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
    error: '/login', // Redirect to login on errors
  },
  secret: process.env.AUTH_SECRET,
};

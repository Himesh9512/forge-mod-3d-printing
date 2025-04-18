import User from '@/types/user';
import axios from 'axios';
import { signIn } from 'next-auth/react';

const baseURL = process.env.BASE_URL || 'http://localhost:3000';

export const fetchUser = async () => {
  const res = await axios
    .get(`${baseURL}/api/user`)
    .then((res) => res)
    .catch((err) => err.response);

  const data = await res.data;

  if (res.status !== 200) {
    throw new Error(data.message);
  }

  return data;
};

export const signInUser = async (email: string, password: string) => {
  const res = await signIn('credentials', { redirect: false, email, password });

  if (res?.error) {
    throw res.error;
  }

  return res;
};

export const registerUser = async (user: { name: string; email: string; password: string }) => {
  const res = await axios
    .post(`${baseURL}/api/auth/register`, user)
    .then((res) => res)
    .catch((err) => err.response);

  const data = await res.data;

  if (res.status !== 201) {
    throw new Error(data.message);
  }

  return data;
};

export const updateUser = async (user: User) => {
  const res = await axios
    .put(`${baseURL}/api/user`, user)
    .then((res) => res)
    .catch((err) => err.response);

  const data = await res.data;

  if (res.status !== 200) {
    throw new Error(data.message);
  }

  return data;
};

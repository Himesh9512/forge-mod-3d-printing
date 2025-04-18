import Product from '@/types/product';
import axios from 'axios';

const baseURL = process.env.BASE_URL || 'http://localhost:3000';

export const fetchProducts = async (page = 1, limit = 10) => {
  const res = await axios
    .get(`${baseURL}/api/products?page=${page}&limit=${limit}`)
    .then((res) => res)
    .catch((err) => err.response);

  const data = await res.data;

  if (res.status !== 200) {
    throw new Error(data.message);
  }

  return data;
};

export const fetchProductById = async (id: string) => {
  const res = await axios
    .get(`${baseURL}/api/products/${id}`)
    .then((res) => res)
    .catch((err) => err.response);

  const data = await res.data;

  if (res.status !== 200) {
    throw new Error(data.message);
  }

  return data;
};

export const createProduct = async (product: Product) => {
  const res = await axios
    .post(`${baseURL}/api/products`, product)
    .then((res) => res)
    .catch((err) => err.response);

  const data = await res.data;

  if (res.status !== 201) {
    throw new Error(data.message);
  }

  return data;
};

export const updateProduct = async ({ id, product }: { id: string; product: Product }) => {
  const res = await axios
    .put(`${baseURL}/api/products/${id}`, product)
    .then((res) => res)
    .catch((err) => err.response);

  const data = await res.data;

  if (res.status !== 200) {
    throw new Error(data.message);
  }

  return data;
};

export const deleteProduct = async (id: string) => {
  const res = await axios
    .delete(`${baseURL}/api/products/${id}`)
    .then((res) => res)
    .catch((err) => err.response);

  const data = await res.data;

  if (res.status !== 200) {
    throw new Error(data.message);
  }

  return data;
};

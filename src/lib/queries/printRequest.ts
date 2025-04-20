import PrintRequest from '@/types/printRequest';
import axios from 'axios';

const baseURL = process.env.BASE_URL || 'http://localhost:3000';

export const fetchPrintRequests = async () => {
  const res = await axios
    .get(`${baseURL}/api/print-requests`)
    .then((res) => res)
    .catch((err) => err.response);

  const data = await res.data;

  if (res.status !== 200) {
    throw new Error(data.message);
  }

  return data;
};

export const fetchPrintRequestById = async (id: string) => {
  const res = await axios
    .get(`${baseURL}/api/print-requests/${id}`)
    .then((res) => res)
    .catch((err) => err.response);

  const data = await res.data;

  if (res.status !== 200) {
    throw new Error(data.message);
  }

  return data;
};

export const createPrintRequest = async (printRequest: PrintRequest) => {
  const res = await axios
    .post(`${baseURL}/api/print-requests`, printRequest)
    .then((res) => res)
    .catch((err) => err.response);

  const data = await res.data;

  if (res.status !== 201) {
    throw new Error(data.message);
  }

  return data;
};

export const updatePrintRequest = async ({ id, printRequest }: { id: string; printRequest: PrintRequest }) => {
  const res = await axios
    .put(`${baseURL}/api/print-requests/${id}`, printRequest)
    .then((res) => res)
    .catch((err) => err.response);

  const data = await res.data;

  if (res.status !== 200) {
    throw new Error(data.message);
  }

  return data;
};

export const deletePrintRequest = async (id: string) => {
  const res = await axios
    .delete(`${baseURL}/api/print-requests/${id}`)
    .then((res) => res)
    .catch((err) => err.response);

  const data = await res.data;

  if (res.status !== 200) {
    throw new Error(data.message);
  }

  return data;
};

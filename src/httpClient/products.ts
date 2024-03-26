import { instance } from './';

export const getProducts = async (limit: number) => {
  const res = await instance.get(`/products?limit=${limit}`);

  return res.data;
};

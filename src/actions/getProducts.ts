import axios from 'axios';

export const getProducts = async () => {
  try {
    const { data } = await axios.get('https://dummyjson.com/carts/3');
    return data?.products;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

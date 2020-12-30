import axios from 'axios';

export const apiFetchOrders = () => {
  let url = 'http://localhost:1337/api/shop/v1/order';

  return axios.get(url);
};

export const apiAddOrder = (order) => {
  let url = 'http://localhost:1337/api/shop/v1/order';
  console.log(order);

  return axios.post(url, order);
};

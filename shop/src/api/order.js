import axios from 'axios';

export const apiFetchOrders = (filters) => {
  let url = 'http://localhost:1337/api/shop/v1/order?';

  for (let filter in filters) {
    if (filters[filter] !== '') {
      url += `${filter}=${filters[filter]}&`;
    }
  }
  console.log(url);
  return axios.get(url);
};

export const apiAddOrder = (order) => {
  let url = 'http://localhost:1337/api/shop/v1/order';
  console.log(order);

  return axios.post(url, order);
};

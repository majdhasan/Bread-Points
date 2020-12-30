import axios from 'axios';

export const apiAddTransaction = (reqData) => {
  return axios.post('http://localhost:1337/api/shop/v1/transaction', reqData);
};

export const apiFetchTransactions = (month) => {
  let url = 'http://localhost:1337/api/shop/v1/transaction';
  return axios.get(url);
};

import axios from 'axios';

export const apiAddTransaction = (reqData) => {
  return axios.post(
    'http://localhost:5000/api/customer/v1/transaction',
    reqData,
  );
};

export const apiFetchTransactions = (month) => {
  let url = 'http://localhost:5000/api/customer/v1/transaction';
  if (month < 12) url += `/${month}`;
  console.log(url);
  return axios.get(url);
};

import axios from 'axios';

export const apiAddTransaction = (reqData) => {
  return axios.post(
    'http://localhost:5000/api/customer/v1/transaction',
    reqData,
  );
};

export const apiFetchTransactions = (month) => {
  let url = 'http://localhost:1337/api/customer/v1/transaction';

  return axios.get(url);
};

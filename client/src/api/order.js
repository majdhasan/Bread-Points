import axios from 'axios';

// export const apiAddOrder = (reqData) => {
//   return axios.post(
//     'http://localhost:5000/api/customer/v1/transaction',
//     reqData,
//   );
// };

export const apiFetchOrders = () => {
  let url = 'http://localhost:1337/api/customer/v1/order';

  return axios.get(url);
};

export const apiGetOrder = (orderId) => {
  let url = 'http://localhost:1337/api/customer/v1/order';
  return axios.get(url, { orderId });
};

export const apiPayOrder = (reqData) => {
  console.log(reqData);
  return axios.post(
    'http://localhost:1337/api/customer/v1/transaction',
    reqData,
  );
};

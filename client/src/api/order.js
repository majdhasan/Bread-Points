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

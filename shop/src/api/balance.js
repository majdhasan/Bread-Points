import axios from 'axios';

export const apiChargeBalance = (reqData) => {
  let url = 'http://localhost:1337/api/shop/v1/transaction';
  console.log(reqData);
  return axios.post(url, reqData);
};

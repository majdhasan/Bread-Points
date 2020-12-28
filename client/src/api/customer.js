import axios from 'axios';

export const apiLogin = (reqData) => {
  return axios.post('http://localhost:1337/api/customer/v1/auth', reqData);
};

export const apiSignup = (reqData) => {
  return axios.post('http://localhost:1337/api/customer/v1/register', reqData);
};

export const getProfile = () => {
  return axios.get('http://localhost:1337/api/customer/v1/me');
};

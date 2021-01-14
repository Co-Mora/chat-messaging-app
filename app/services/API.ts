import axios from 'axios';
const API = axios.create();

API.defaults.baseURL = 'https://api.mocki.io'

export default {
  getUserMessage: async () => {
    return API.get(
      '/v1/b043df5a'
    );
  },
};
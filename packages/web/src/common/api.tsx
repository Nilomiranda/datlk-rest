import axios from 'axios';

function api(tokenRequired = false) {
  const API_URL = 'https://dtalk-api.herokuapp.com/api';

  const api = axios.create({
    baseURL: API_URL,
  });

  if (tokenRequired) {
    const token = localStorage.getItem('DTALK_TOKEN');
    console.log('token for header -> ', token);

    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }

  return api;
}

export default api;

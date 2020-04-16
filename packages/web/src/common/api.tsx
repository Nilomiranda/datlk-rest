import axios from 'axios';

function api(tokenRequired = false) {
  let API_URL;

  if (process.env.NODE_ENV === 'development') {
    API_URL = process.env.REACT_APP_DEV_API_URL;
  } else if (process.env.NODE_ENV === 'production') {
    API_URL = process.env.REACT_APP_PROD_API_URL;
  }

  const api = axios.create({
    baseURL: API_URL,
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      // 'Access-Control-Allow-Origin': 'https://https://dtalk-rest.now.sh',
      // 'Allow-Access-Control-Origin': 'https://https://dtalk-rest.now.sh',
    }
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

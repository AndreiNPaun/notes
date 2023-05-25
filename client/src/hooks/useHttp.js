import axios from 'axios';

const useHttp = async ({ method = 'get', url, values, token }) => {
  const options = {
    headers: {
      'Content-type': 'application/json',
    },
  };

  if (method !== 'get') {
    options.data = values;
  }

  if (token) {
    options.headers.Authorization = `Bearer ${token}`;
  }

  const response = await axios({ method, url, ...options });
  return response.data;
};

export default useHttp;

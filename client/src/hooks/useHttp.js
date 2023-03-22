import axios from 'axios';

const useHttp = async ({ method = 'get', url, values, token }) => {
  const options = {
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  if (method !== 'get') {
    options.data = values;
  }

  const response = await axios({ method, url, ...options });
  return response.data;
};

export default useHttp;

import cookie from 'js-cookie';

const Logout = () => {
  cookie.remove('token');
  cookie.remove('refreshToken');

  window.location.reload(false);
};

export default Logout;

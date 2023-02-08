import Header from '../UI/Header';

const Logout = (props) => {
  const logout = () => {
    localStorage.clear('token');
    localStorage.clear('refreshToken');
  };

  return <Header token={props.token} logout={logout} />;
};

export default Logout;

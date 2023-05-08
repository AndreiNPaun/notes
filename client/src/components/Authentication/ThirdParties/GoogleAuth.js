import React, { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { setTokenFromURL } from '../../../store/action/token';
import { useNavigate } from 'react-router-dom';

const GoogleAuth = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getTokensFromUrl = () => {
    const token = props.token;
    const refreshToken = props.refreshToken;

    if (token && refreshToken) {
      dispatch(setTokenFromURL({ token, refreshToken }));
      navigate('/');
    }
  };

  useEffect(() => {
    getTokensFromUrl();
  }, []);

  return (
    <div>
      <a href="http://localhost:8000/api/auth/google">Google</a>
    </div>
  );
};

export default GoogleAuth;

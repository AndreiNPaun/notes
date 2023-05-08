import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId="131434809496-2lfpp7206u8v35lenbsko2hr8r8vmogq.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);

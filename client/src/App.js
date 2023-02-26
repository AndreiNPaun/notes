import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Homepage from './pages/Homepage';
import LoginPage from './pages/Login';
import LogoutPage from './pages/Logout';
import RegisterPage from './pages/Register';
import RootLayout from './pages/RootLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Homepage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'logout', element: <LogoutPage /> },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

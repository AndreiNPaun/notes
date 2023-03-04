import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { ChakraProvider } from '@chakra-ui/react';

import Homepage from './pages/Homepage';
import LoginPage from './pages/Login';
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
    ],
  },
]);

function App() {
  return (
    <>
      <ChakraProvider>
        <RouterProvider router={router} />
      </ChakraProvider>
    </>
  );
}

export default App;

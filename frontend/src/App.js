import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomePage, { loader as productsLoader } from './pages/Home';
import RootLayoutPage from './pages/RootLayout';
import ProductDetailPage, { loader as productDetailLoader } from './pages/ProductDetail';
import ErrorPage from './pages/Error';
import CartPage from './pages/Cart';
import LoginPage from './pages/Login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayoutPage />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage />, loader: productsLoader },
      { path: 'product/:id', element: <ProductDetailPage />, loader: productDetailLoader },
      { path: 'cart', element: <CartPage /> },
      { path: 'login', element: <LoginPage /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

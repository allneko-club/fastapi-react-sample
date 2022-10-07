import React from 'react';
import {QueryClient, QueryClientProvider} from 'react-query'
import ReactDOM from 'react-dom/client';
import {RouterProvider} from "react-router-dom";

import 'index.css';
import reportWebVitals from 'reportWebVitals';
import AuthProvider from 'components/AuthProvider'
import {router} from 'routes'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

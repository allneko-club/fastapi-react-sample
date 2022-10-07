import ErrorPage from 'components/ErrorPage'
import Home from 'pages/Home'
import Login from 'pages/Login'
import ResetPassword from 'pages/ResetPassword'
import ResetPasswordConfirm from 'pages/ResetPasswordConfirm'
import ResetPasswordDone from 'pages/ResetPasswordDone'
import ResetPasswordConfirmDone from '../pages/ResetPasswordConfirmDone'

export const publicRoutes = [
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/reset-password-done",
    element: <ResetPasswordDone />,
  },
  {
    path: "/reset-password-confirm",
    element: <ResetPasswordConfirm />,
  },
  {
    path: "/reset-password-confirm-done",
    element: <ResetPasswordConfirmDone />,
  },
];
import ErrorPage from 'components/ErrorPage'
import PrivateRoot from 'pages/private/Root'
import Private from 'pages/private'
import Profile from 'pages/private/Profile'
import UpdateProfile from 'pages/private/UpdateProfile'
import UpdatePassword from 'pages/private/UpdatePassword'

export const authRoutes = [
  {
    path: "/private/",
    element: <PrivateRoot />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Private />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "update-profile",
        element: <UpdateProfile />,
      },
      {
        path: "update-password",
        element: <UpdatePassword />,
      },
    ]
  },
];
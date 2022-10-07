import AdminRoot from 'pages/admin/Root'
import ErrorPage from 'components/ErrorPage'
import Admin from 'pages/admin'
import Users from 'pages/admin/Users'
import CreateUser from 'pages/admin/CreateUser'
import UpdateUser from 'pages/admin/UpdateUser'

export const adminRoutes = [
  {
    path: "/admin/",
    element: <AdminRoot />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Admin />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "users/create",
        element: <CreateUser />,
      },
      {
        path: "users/update/:userId",
        element: <UpdateUser />,
      },
    ],
  },
];
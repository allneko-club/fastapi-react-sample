import React from 'react'
import {useEffect} from 'react'
import {api} from 'api/backend-api'
import {Link as RouterLink, useNavigate} from 'react-router-dom'
import {Button, Link} from '@mui/material'
import {useMutation, useQuery} from 'react-query'
import {useAuth} from '../../components'
import AdminLayout from 'components/layout/AdminLayout'


export default function Users() {
  const auth = useAuth();

  useEffect(() => {
  }, []);

  const { isLoading, error, data: users } = useQuery(["getUsers"],
    () => api.getUsers(auth.user.token).then(res => res.data)
  );

  const mutation = useMutation(
    data => api.deleteUser(auth.user.token, data),
    {
      onSuccess: async () => {
        console.log('success delete user');
      },
    }
  );
  const onSubmit = data => mutation.mutate(data);

  if (isLoading) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  return (
    <AdminLayout title="Users">
      <Link component={RouterLink} to="/admin/users/create">create</Link>
      {users &&
          <ul>
              {users.map(user => (
                  <li key={user.id}>{user.id}: {user.email}{'  '}
                    <Link component={RouterLink} to={`/admin/users/update/${user.id}`}>update</Link>
                    <Button
                      variant="outlined"
                      disabled={mutation.isLoading}
                      onClick={() => onSubmit(user.id)}
                    >
                      delete
                    </Button>
                  </li>
                )
              )}
          </ul>
      }
    </AdminLayout>
  )
}


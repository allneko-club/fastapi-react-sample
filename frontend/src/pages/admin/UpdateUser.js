import React from 'react'
import {useNavigate} from 'react-router-dom'
import {useMutation, useQuery, useQueryClient} from 'react-query'
import {api} from 'api/backend-api'
import * as yup from 'yup'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import {Button, Checkbox, FormControlLabel, TextField} from '@mui/material'
import AdminLayout from 'components/layout/AdminLayout'
import {useAuth} from 'components'

export default function UpdateUser() {
  const navigate = useNavigate();
  const auth = useAuth()

  const { isLoading, error, data: user } = useQuery(["updateUser"],
    () => api.getMe(auth.user.token).then(res => res.data)
  );

  const schema = yup.object({
      name: yup.string(),
      email: yup.string().email().required(),
      is_active: yup.boolean(),
      is_superuser: yup.boolean(),
      password1: yup.string().required().label('password'),
      password2: yup.string().required().label('password (confirm)')
          .oneOf([yup.ref('password1')], 'Passwords do not match'),
  });

  const {register, handleSubmit, formState} = useForm({resolver: yupResolver(schema)});
  const {errors} = formState;

  const queryClient = useQueryClient()
  const mutation = useMutation(
    data => api.updateUser(auth.user.token, data),
{
          onSuccess: async () => {
            await queryClient.invalidateQueries(["updateUser"]);
            await navigate('/admin/users');
          },
        }
  );

  const onSubmit = data => mutation.mutate(data);

  if (isLoading) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;


  return (
    <AdminLayout title="Update User">
      {mutation.isError && <div>{mutation.error}</div>}
      <div>
        <TextField
          label='name'
          {...register('name')}
          defaultValue={user.name}
          error={'name' in errors}
          helperText={errors.name?.message}
        />
        <TextField
          required
          label='email'
          type='email'
          {...register('email')}
          defaultValue={user.email}
          error={'email' in errors}
          helperText={errors.email?.message}
        />
      </div>
      <div>
        <FormControlLabel
          label="active"
          control={<Checkbox {...register('is_active')} />}
        />
        <FormControlLabel
          label="superuser"
          control={<Checkbox {...register('is_superuser')} />}
        />
      </div>
        <div>
        <TextField
          required
          label='password'
          type='password'
          {...register('password1')}
          error={'password1' in errors}
          helperText={errors.password1?.message}
        />
        <TextField
          required
          label='Password(confirm)'
          type='password'
          {...register('password2')}
          error={'password2' in errors}
          helperText={errors.password2?.message}
        />
      </div>
      <Button
        variant="outlined"
        disabled={formState.isSubmitting}
        onClick={handleSubmit(onSubmit)}
      >
        Submit
      </Button>
    </AdminLayout>
  );
}

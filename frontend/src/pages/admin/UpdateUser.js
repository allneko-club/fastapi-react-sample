import React from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {useMutation, useQuery, useQueryClient} from 'react-query'
import {api} from 'api/backend-api'
import * as yup from 'yup'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import {Button, Checkbox, FormControlLabel, TextField} from '@mui/material'
import AdminLayout from 'components/layout/AdminLayout'

export default function UpdateUser() {
  const navigate = useNavigate();
  let { userId } = useParams();

  const { isLoading, isFetching, error, data: user } = useQuery(["updateUser"],
    () => api.getUser(userId).then(res => res.data)
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
    data => api.updateUser(userId, data),
{
          onSuccess: async () => {
            await queryClient.invalidateQueries(["updateUser"]);
            await navigate('/admin/users');
          },
        }
  );

  const onSubmit = values => {
    let data = {};
    if (values.name) {
      data.name = values.name;
    }
    if (values.email) {
      data.email = values.email;
    }
    data.is_active = values.is_active;
    data.is_superuser = values.is_superuser;
    if (values.password1) {
      data.password = values.password1;
    }
    mutation.mutate(data);
  }

  if (isLoading || isFetching) return 'Loading...';

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
          control={<Checkbox defaultChecked={user.is_active} {...register('is_active')} />}
        />
        <FormControlLabel
          label="superuser"
          control={<Checkbox defaultChecked={user.is_superuser} {...register('is_superuser')} />}
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

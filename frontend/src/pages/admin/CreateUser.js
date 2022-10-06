import React from 'react'
import {useNavigate} from 'react-router-dom'
import {useMutation} from 'react-query'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import {useForm} from 'react-hook-form'
import {api} from 'api/backend-api'
import AdminLayout from 'components/layout/AdminLayout'
import {Button, Checkbox, FormControlLabel, TextField} from '@mui/material'
import {useAuth} from 'components'

export default function CreateUser() {
  const navigate = useNavigate();
  const auth = useAuth()

  const schema = yup.object({
      name: yup.string(),
      email: yup.string().required().email(),
      is_active: yup.boolean(),
      is_superuser: yup.boolean(),
      password1: yup.string().required().label('password'),
      password2: yup.string().required().label('password (confirm)')
          .oneOf([yup.ref('password1')], 'Passwords do not match'),
  });
  const {register, handleSubmit, formState} = useForm({resolver: yupResolver(schema)});
  const {errors} = formState;

  const mutation = useMutation(
    data => api.createUser(data),
{onSuccess: async () => await navigate('/admin/users')}
  );

  const onSubmit = values => {
    let data = {};
    data.name = values.name;
    data.email = values.email;
    data.is_active = values.is_active;
    data.is_superuser = values.is_superuser;
    data.password = values.password1;
    mutation.mutate(data);
  }

  return (
    <AdminLayout title="Create User">
      {mutation.isError && <div>{mutation.error}</div>}
      <div>
        <TextField
          label='name'
          {...register('name')}
          error={'name' in errors}
          helperText={errors.name?.message}
        />
        <TextField
          required
          label='email'
          type='email'
          {...register('email')}
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

import React from 'react';
import * as yup from 'yup'
import {useForm} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import {api} from 'api/backend-api'
import {useMutation} from 'react-query'
import {useNavigate} from 'react-router-dom'
import {Button, TextField} from '@mui/material'
import MainLayout from 'components/layout/MainLayout'

export default function UpdatePassword() {
  const navigate = useNavigate();

  const schema = yup.object({
    password1: yup.string().required().label('password'),
    password2: yup.string().required().label('password (confirm)')
    .oneOf([yup.ref('password1')], 'Passwords do not match'),
  });

  const {register, handleSubmit, formState} = useForm(
    {resolver: yupResolver(schema)}
  );
  const {errors} = formState;

  const mutation = useMutation(
    data => api.updateMe(data),
    {onSuccess: async () => await navigate('/private/profile')}
  );

  const onSubmit = values => mutation.mutate({password: values.password1});

  return (
    <MainLayout title="Update Password">
      {mutation.isError && <div>{mutation.error}</div>}
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
    </MainLayout>
  );
}

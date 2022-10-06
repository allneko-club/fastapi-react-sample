import React from 'react';
import * as yup from 'yup'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import {api} from 'api/backend-api'
import MainLayout from 'components/layout/MainLayout'
import {useMutation} from 'react-query'
import {useNavigate} from 'react-router-dom'
import { Button, TextField } from '@mui/material'

export default function ResetPassword() {
  const navigate = useNavigate();

  const schema = yup.object({
    email: yup.string().email().required('email is required'),
  });

  const {register, handleSubmit, formState} = useForm(
    {resolver: yupResolver(schema)}
  );
  const {errors} = formState;

  const mutation = useMutation(
    email => api.recoverPassword(email),
    {onSuccess: async () => await navigate('/reset-password-done')}
  );

  const onSubmit = values => mutation.mutate(values.email);

  return (
    <MainLayout title="Reset Password">
      {mutation.isError && <div>{mutation.error}</div>}
      <TextField
        required
        label='email'
        type='email'
        {...register('email')}
        error={'email' in errors}
        helperText={errors.email?.message}
      />
      <br/>
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

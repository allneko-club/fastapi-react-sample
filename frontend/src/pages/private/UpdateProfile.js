import React from 'react';
import * as yup from 'yup'
import {useForm} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import {useMutation} from 'react-query'
import {useNavigate} from 'react-router-dom'
import {Button, TextField} from '@mui/material'
import {useAuth} from 'components'
import MainLayout from 'components/layout/MainLayout'


export default function UpdateProfile() {
  const navigate = useNavigate();
  const auth = useAuth();

  const schema = yup.object({
    name: yup.string().required(),
    email: yup.string().email().required(),
  });

  const {register, handleSubmit, formState} = useForm(
    {resolver: yupResolver(schema)}
  );
  const {errors} = formState;

  const mutation = useMutation(
    data => auth.updateMe(auth.user.token, data),
{
          onSuccess: async () => {
            await navigate('/private/profile');
          },
        }
  );

  const onSubmit = data => mutation.mutate(data);

  return (
    <MainLayout title="Update Profile">
      {mutation.isError && <div>{mutation.error}</div>}
      <div>
        <TextField
          label='name'
          {...register('name')}
          defaultValue={auth.user.name}
          error={'username' in errors}
          helperText={errors.name?.message}
        />
        <TextField
          required
          label='email'
          type='email'
          {...register('email')}
          defaultValue={auth.user.email}
          error={'email' in errors}
          helperText={errors.email?.message}
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

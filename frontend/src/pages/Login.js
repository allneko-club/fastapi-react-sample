import React from 'react';
import {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button, Link, TextField } from '@mui/material'

import {Link as RouterLink, useNavigate} from 'react-router-dom'
import {useAuth} from 'components/AuthProvider'
import MainLayout from 'components/layout/MainLayout'
import {useMutation} from 'react-query'

export default function Login() {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    auth.user && navigate('/')
  }, [auth]);

  const schema = yup.object({
    username: yup.string().required(),
    password: yup.string().required()
  });

  const {register, handleSubmit, formState} = useForm(
    {resolver: yupResolver(schema)}
  );
  const {errors} = formState;

  const mutation = useMutation(
    data => auth.login(data),
  {
          onSuccess: async () => {
            await navigate('/private/');
          },
        }
  );

  const onSubmit = values => mutation.mutate(values);

  return (
    <MainLayout title="Login">
      {mutation.isError && <div>{mutation.error}</div>}
      <div>
        <TextField
          required
          label='username'
          {...register('username')}
          error={'username' in errors}
          helperText={errors.username?.message}
        />
        <TextField
          required
          label='password'
          type='password'
          {...register('password')}
          error={'password' in errors}
          helperText={errors.password?.message}
        />
      </div>
      <div>
        <Button
          variant="outlined"
          disabled={formState.isSubmitting}
          onClick={handleSubmit(onSubmit)}
        >
          Login
        </Button>
      </div>
      <div>
        <Link component={RouterLink} to="/reset-password/">ResetPassword</Link>
      </div>
    </MainLayout>
  );
}
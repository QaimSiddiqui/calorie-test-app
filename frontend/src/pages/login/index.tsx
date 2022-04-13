import { useState } from 'react';

import {
  Alert,
  Avatar,
  Box,
  Grid,
  Link,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LoadingButton from '@mui/lab/LoadingButton';
import { useFormik } from 'formik';
import { Helmet } from 'react-helmet-async';
import * as Yup from 'yup';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { getAxiosError } from 'shared/utils/validate';
import { useLogin } from './service/login.hooks';

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must Contain 6 Characters.'),
});

export function Login() {
  const { mutate: loginMutation, error, isLoading, isError } = useLogin();

  const [showPassword, setShowPassword] = useState(false);

  const { handleChange, values, handleBlur, touched, errors, ...formik } =
    useFormik({
      initialValues: {
        email: '',
        password: '',
      },
      validationSchema: loginSchema,
      onSubmit: (values) => {
        loginMutation(values);
      },
    });

  return (
    <>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Calorie Tracker Login Page" />
      </Helmet>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          noValidate
          sx={{ mt: 1, maxWidth: '500px' }}
        >
          {isError && <Alert severity="error">{getAxiosError(error)}!</Alert>}
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    edge="end"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <LoadingButton
            loading={isLoading}
            variant="contained"
            type="submit"
            fullWidth
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </LoadingButton>
          <Grid container>
            <Grid item>
              <Link href="register" variant="body2">
                {"Don't have an account? Register"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}

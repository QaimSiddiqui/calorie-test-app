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
import { useRegister } from './service/register.hooks';

const registerSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must Contain 6 Characters.')
    .oneOf([Yup.ref('password')], 'make sure both passwords match'),
});

export function Register() {
  const { mutate: registerMutation, error, isLoading, isError } = useRegister();

  const [passwordVisibility, setPasswordVisibility] = useState({
    showPassword: false,
    showConfirmPassword: false,
  });

  const { handleChange, values, handleBlur, touched, errors, ...formik } =
    useFormik({
      initialValues: {
        email: '',
        password: '',
        name: '',
        confirmPassword: '',
      },
      validationSchema: registerSchema,
      onSubmit: (values) => {
        const { confirmPassword, ...data } = values;
        registerMutation(data);
      },
    });

  return (
    <>
      <Helmet>
        <title>Register</title>
        <meta name="description" content="Calorie Tracker Register Page" />
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
          Register
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
            id="name"
            label="Full Name"
            name="name"
            autoComplete="name"
            autoFocus
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.name && Boolean(errors.name)}
            helperText={touched.name && errors.name}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
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
            type={passwordVisibility?.showPassword ? 'text' : 'password'}
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
                    onClick={() => {
                      setPasswordVisibility({
                        showConfirmPassword:
                          passwordVisibility.showConfirmPassword,
                        showPassword: !passwordVisibility.showPassword,
                      });
                    }}
                  >
                    {passwordVisibility?.showPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type={passwordVisibility.showConfirmPassword ? 'text' : 'password'}
            id="confirmPassword"
            autoComplete="current-confirmPassword"
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.confirmPassword && Boolean(errors.confirmPassword)}
            helperText={touched.confirmPassword && errors.confirmPassword}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle confirmPassword visibility"
                    edge="end"
                    onClick={() => {
                      setPasswordVisibility({
                        showPassword: passwordVisibility.showPassword,
                        showConfirmPassword:
                          !passwordVisibility.showConfirmPassword,
                      });
                    }}
                  >
                    {passwordVisibility.showConfirmPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
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
            Register
          </LoadingButton>
          <Grid container>
            <Grid item>
              <Link href="login" variant="body2">
                Already have an account? Log in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}

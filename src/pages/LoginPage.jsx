import React, { useState } from 'react';
import { Button, Checkbox, CircularProgress, Container, Divider, FormControlLabel, Grid, Stack, TextField, Typography } from '@mui/material';
import Logo from '../assets/logo.svg';
import Img from '../assets/login-page-img.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { login } from '../services/userAuthentication';
import { useUserContext } from '../hooks/AuthProvider';
import Footer from '../components/Footer';
import { ArrowBack } from '@mui/icons-material';

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

export default function LoginPage() {
  const { setAuthenticated, setToken } = useUserContext();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorHandlerText, setErrorHandlerText] = useState('');

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const res = await login(values);
        localStorage.setItem('access-token', res.data.token);
        setAuthenticated(true);
        setToken(res.data.token)
        navigate('/home');
      } catch (err) {
        setIsLoading(false);
        console.error('Login Error:', err);  // Log the error
        setErrorHandlerText(err.response?.data || 'An error occurred');
      }
    },
  });

  return (
    <Container maxWidth="md" mx>
      <Grid
        container
        bgcolor="background.default"
        mt={5}
        borderRadius={2}
        p={2}
        boxShadow="rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px"
      >
        <Grid item xs={6}>
          <form onSubmit={formik.handleSubmit}>
            <Stack direction="column" px={5}>
              <Stack alignItems="center" mb={5} direction="row">
                <Link to="/"><Button variant="contained" startIcon={<ArrowBack />}>Back</Button></Link>
                <img src={Logo} alt="Logo" width="175px" />
              </Stack>
              <Divider />

              <TextField
                type="email"
                sx={{ mt: 5 }}
                size="small"
                variant="outlined"
                label="Email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <Link to="/forget">

                <Typography sx={{ mt: 2 }} textAlign="right">
                  Forget password ?
                </Typography>
              </Link>
              <TextField
                type="password"
                size="small"
                variant="outlined"
                label="Password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />

              <Stack mt={1}>
                <FormControlLabel control={<Checkbox />} label="Keep me logged in" />
              </Stack>
              <Typography color="error">{errorHandlerText}</Typography>
              <Button
                type="submit"
                size="large"
                sx={{ mt: 1 }}
                color="primary"
                variant="contained"
                disabled={!formik.isValid}
                startIcon={isLoading && <CircularProgress sx={{ width: 25, height: 25 }} />}
              >
                Login
              </Button>
              {formik.submitCount > 0 && !formik.isValid && (
                <Typography color="error">Please fill in all required fields correctly.</Typography>
              )}
              <Typography sx={{ mt: 1 }}>
              Don’t have an account yet? <Link to="/signup">Sign up</Link>
              </Typography>
            </Stack>
          </form>
        </Grid>
        <Grid item xs={6}>
          <Stack borderRadius={2} justifyContent="center">
            <img src={Img} alt="Login Page" height="450px" style={{ borderRadius: '2%' }} />
          </Stack>
        </Grid>
      </Grid>
      <Footer />
    </Container>
  );
}

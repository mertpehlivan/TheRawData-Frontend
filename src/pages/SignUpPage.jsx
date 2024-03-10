
import React, { useState } from 'react'
import { Box, Button, Checkbox, Container, Divider, FormControlLabel, Grid, IconButton, InputLabel, MenuItem, Paper, Select, Stack, TextField, Typography } from '@mui/material'
import Logo from '../assets/logo.svg'
import Img from '../assets/register-image.jpg'
import { Link, useNavigate } from 'react-router-dom'
import SelectInput from '@mui/material/Select/SelectInput'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { signUp } from '../services/userAuthentication'
import { ArrowBack, BackHand, Dangerous, ForkLeftOutlined, SwipeLeftAlt } from '@mui/icons-material'
import { useUserContext } from '../hooks/AuthProvider'
import Footer from '../components/Footer'

const validationSchema = yup.object({
  firstname: yup
    .string("Enter your firstname")
    .required("Firstname is required"),
  lastname: yup
    .string("Enter your lastname")
    .required("Lastname is required"),
  uniqueName: yup
    .string("Enter your Username")
    .required("Username is required"),
  country: yup
    .string("Enter your country")
    .required("Country is required"),
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

export default function SignUpPage() {
  const countries = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua &amp; Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia &amp; Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Cape Verde", "Cayman Islands", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cruise Ship", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyz Republic", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania", "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre &amp; Miquelon", "Samoa", "San Marino", "Satellite", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "South Africa", "South Korea", "Spain", "Sri Lanka", "St Kitts &amp; Nevis", "St Lucia", "St Vincent", "St. Lucia", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad &amp; Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks &amp; Caicos", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"];
  const navigate = useNavigate();
  const [errorHandlerText, setErrorHandlerText] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState("");
  const { setAuthenticated,setToken } = useUserContext();
  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      country: '',
      email: '',
      password: '',
      uniqueName: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setIsLoading(true);
      signUp(values)
        .then((res) => {
          localStorage.setItem("access-token",res.data.token)
          setToken(res.data.token)
          setAuthenticated(true)

        }).catch((e) => {
          setErrorHandlerText(e.response.data.errorMessage)
        })
    },
  });
  return (
    <Container maxWidth='md' mx>
      <Grid
        container
        bgcolor='background.default'
        mt={5}
        borderRadius={2}
        p={2}
        boxShadow='rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px'
      >
        <Grid item xs={6} >
          <Stack direction='column' px={5}>
            <Stack alignItems='center' mb={5} direction="row" spacing={1}>
              <Link to="/"><Button variant="contained" startIcon={<ArrowBack/>}>Back</Button></Link>
              <img src={Logo} width='175px' />
            </Stack>
            <Divider />
            <Stack component='form' onSubmit={formik.handleSubmit}>
              <TextField
                sx={{ mt: 5 }}
                size='small'
                variant='outlined'
                label='First Name'
                name='firstname'
                value={formik.values.firstname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.firstname && Boolean(formik.errors.firstname)}
                helperText={formik.touched.firstname && formik.errors.firstname}
              />
              <TextField
                sx={{ mt: 3 }}
                size='small'
                variant='outlined'
                label='Last Name'
                name='lastname'
                value={formik.values.lastname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.lastname && Boolean(formik.errors.lastname)}
                helperText={formik.touched.lastname && formik.errors.lastname}
              />
              <TextField
                sx={{ mt: 3 }}
                size='small'
                type='text'
                autoComplete={false}
                variant='outlined'
                label='Username'
                name='uniqueName'
                value={formik.values.uniqueName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.uniqueName && Boolean(formik.errors.uniqueName)}
                helperText={formik.touched.uniqueName && formik.errors.uniqueName}
              />
              <Select
                name='country'
                sx={{ mt: 3 }}
                size='small'
                placeholder='country'
                value={formik.values.country}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.country && Boolean(formik.errors.country)}
                helperText={formik.touched.country && formik.errors.country}
              >
                {countries.map((country, index) => (
                  <MenuItem key={index} value={country}>
                    {country}
                  </MenuItem>
                ))}
              </Select>
              <TextField
                name='email'
                type='email'
                sx={{ mt: 3 }}
                size='small'
                variant='outlined'
                label='Email'
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />

              <TextField
                name='password'
                type='password'
                sx={{ mt: 3, mb: 3 }}
                size='small'
                variant='outlined'
                label='Password'
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
              {errorHandlerText &&<Stack direction="row" >
                <Dangerous sx={{color:"red"}} />
                <Typography color="red">{errorHandlerText}</Typography>
              </Stack>}

              <Button type='submit' size='large' sx={{ mt: 1 }} color="primary" variant='contained'>Sign up</Button>
              <Typography sx={{ mt: 1 }}>If you have an account, <Link to="/login">log in</Link></Typography>
            </Stack>

          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack borderRadius={2} justifyContent='center'>
            <img src={Img} height='550px' style={{ borderRadius: '2%' }} />
          </Stack>
        </Grid>
      </Grid>
      <Footer/>
    </Container>

  )
}

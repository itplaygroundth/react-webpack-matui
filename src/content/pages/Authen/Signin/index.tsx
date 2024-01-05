import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router';
import { useAuth } from '@src/contexts/AuthContext';



function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();
type Credentials = {
  username:string;
  password:string;
}
export default function SignIn() {
  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();

  //   const url = "https://wallet.tsxbet.net/api/Admin/Login"

  //   const data = new FormData(event.currentTarget);
  //   console.log({
  //     email: data.get('email'),
  //     password: data.get('password'),
  //   });
  // };
  const context = useAuth()
  const navigate = useNavigate()
  const [username, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");



  async function loginUser(credentials:Credentials) {


    return fetch('https://wallet.tsxbet.net/api/Admin/Login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
   }

   const handleSubmit = async (e:any) => {
    e.preventDefault();
     
    const response = await loginUser({
      username,
      password
    });
    if (response.status) {
        const data = JSON.parse(response.message)
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('user',data.username);
        
        
        Swal.fire("Signin Success!").then((result) => {
        //  history.replace('/'); 
        data.role = "admin"
        context.dispatch({ type: "LOGIN", payload: data })
        navigate("/")
      //history.push('/dashboard'); // Redirect to the dashboard after login
        })
     
      // Swal.fire({
      //   title: "Do you want to save the changes?",
      //   showDenyButton: true,
      //   showCancelButton: true,
      //   confirmButtonText: "Save",
      //   denyButtonText: `Don't save`
      // }).then((result) => {
      //   /* Read more about isConfirmed, isDenied below */
      //   if (result.isConfirmed) {
      //     Swal.fire("Saved!", "", "success");
      //   } else if (result.isDenied) {
      //     Swal.fire("Changes are not saved", "", "info");
      //   }
      // });
      // Swal("Success", response.message, "success", {
      //   buttons: false,
      //   timer: 2000,
      // })
      // .then((value:any) => {
      //   localStorage.setItem('accessToken', response['accessToken']);
      //   localStorage.setItem('user', JSON.stringify(response['user']));
      //   window.location.href = "/profile";
      // });
    } else {
      //Swal("Failed", response.message, "error");
      Swal.fire({
        title: "Failed",
        text: response.message,
        icon: "error"
      });
    }
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={e => setUserName(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={e => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
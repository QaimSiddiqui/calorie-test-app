import { Box, Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import HomeImg from 'shared/assets/home.png';

export function Dashboard() {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
        <meta name="description" content="Calorie Tracker Dashboard Page" />
      </Helmet>
      <Grid
        container
        columns={{ xs: 12, md: 12 }}
        sx={{
          minHeight: '100vh',
        }}
      >
        <Grid
          item
          md={6}
          sm={12}
          sx={{
            marginTop: '100px',
          }}
        >
          <Typography variant="h3" gutterBottom component="div">
            Fitness starts with what you eat.
          </Typography>
          <Typography variant="h5" gutterBottom component="div">
            Take control of your goals. Track calories, break down ingredients,
            and log activities.
          </Typography>
          <Box
            sx={{
              maxWidth: '300px',
              backgroundColor: 'primary.main',
              height: '50px',
              borderRadius: '6px',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              my: '20px',
              cursor: 'pointer',
            }}
            onClick={() => navigate('/register')}
          >
            <Typography variant="h6" component="a">
              Start Free
            </Typography>
          </Box>
          <Typography variant="body1" component="p">
            Already have an account?{' '}
            <Typography
              variant="inherit"
              component="a"
              onClick={() => navigate('/login')}
              sx={{ cursor: 'pointer', textDecoration: 'underline' }}
            >
              Login
            </Typography>
          </Typography>
        </Grid>
        <Grid
          item
          md={6}
          sm={12}
          sx={{
            height: '100%',
            paddingTop: '50px',
          }}
        >
          <img
            src={HomeImg}
            alt="home"
            style={{
              maxWidth: '100%',
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}

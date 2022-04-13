import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTokenContext } from 'shared/service/token.context';

export default function Header() {
  const navigate = useNavigate();
  const { tokens, saveTokens, decodedToken } = useTokenContext();

  const handleNavigation = (route: string) => () => {
    navigate(route);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Container maxWidth="lg">
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              onClick={handleNavigation('/')}
              sx={{ flexGrow: 1, cursor: 'pointer' }}
            >
              Calories Tracker
            </Typography>

            {!tokens?.access?.token && (
              <Fragment>
                <Button color="inherit" onClick={handleNavigation('/login')}>
                  Login
                </Button>
                <Button color="inherit" onClick={handleNavigation('/register')}>
                  Register
                </Button>
              </Fragment>
            )}
            {tokens?.access?.token && (
              <Fragment>
                {tokens?.access?.token && decodedToken?.role === 'admin' && (
                  <Fragment>
                    <Button
                      color="inherit"
                      onClick={handleNavigation('/users')}
                    >
                      Users
                    </Button>
                    <Button
                      color="inherit"
                      onClick={handleNavigation('/reports')}
                    >
                      Reports
                    </Button>
                  </Fragment>
                )}{' '}
                <Button
                  color="inherit"
                  onClick={() => {
                    handleNavigation('/')();
                    saveTokens(null);
                  }}
                >
                  Logout
                </Button>
              </Fragment>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}

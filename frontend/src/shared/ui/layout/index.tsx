import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Helmet } from 'react-helmet-async';
import Header from '../components/header';

const theme = createTheme({
  palette: {
    primary: {
      light: '#4dabf5',
      main: '#2196f3',
      dark: '#1769aa',
      contrastText: '#fff',
    },
    secondary: {
      light: '#007bb2',
      main: '#00b0ff',
      dark: '#04327b',
      contrastText: '#fff',
    },
  },
});
interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <ThemeProvider theme={theme}>
      <Helmet
        titleTemplate="%s - Calorie Tracker"
        defaultTitle="Calorie Tracker"
      >
        <meta name="description" content="A Calorie Tracking application" />
      </Helmet>
      <CssBaseline />
      <Header />
      <Container maxWidth="lg">{children}</Container>
      {/* <Footer /> */}
    </ThemeProvider>
  );
}

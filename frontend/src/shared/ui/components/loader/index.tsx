import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
interface Props {
  height?: string;
  width?: string;
}
export default function Loader({ height = '100vh', width = '100%' }: Props) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height,
        width: '100%',
      }}
    >
      <CircularProgress />
    </Box>
  );
}

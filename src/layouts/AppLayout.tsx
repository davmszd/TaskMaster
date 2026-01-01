import { ThemeToggle } from '../components/ThemeToggle';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  IconButton,
} from '@mui/material';
import {
  Task as TaskIcon,
  Notifications,
  Settings,
  AccountCircle,
} from '@mui/icons-material';

type AppLayoutProps = {
  children: React.ReactNode;
};

function AppLayout({ children }: AppLayoutProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" elevation={2}>
        <Toolbar>
          <TaskIcon sx={{ mr: 2 }} />
          <Typography
            variant="h6"
            component="h1"
            sx={{ flexGrow: 1, fontWeight: 'bold' }}
          >
            TaskMaster
          </Typography>
          <IconButton color="inherit" sx={{ mr: 1 }}>
            <Notifications />
          </IconButton>
          <IconButton color="inherit" sx={{ mr: 2 }}>
            <Settings />
          </IconButton>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          <ThemeToggle />
        </Toolbar>
      </AppBar>

      <Container component="main" sx={{ flex: 1, py: 4 }} maxWidth="lg">
        {children}
      </Container>

      <Box
        component="footer"
        sx={{
          bgcolor: 'background.paper',
          py: 3,
          mt: 'auto',
          borderTop: 1,
          borderColor: 'divider',
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary" align="center">
            © 2024 TaskMaster. Built with React + TypeScript + Material-UI.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}

export default AppLayout;

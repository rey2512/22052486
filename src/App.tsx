import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { 
  Box,
  Container, 
  CssBaseline, 
  ThemeProvider,
  AppBar,
  Toolbar,
  Typography,
  Tabs,
  Tab
} from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import Leaderboard from './components/Leaderboard';
import TrendingPosts from './components/TrendingPosts';
import Feed from './components/Feed';
import theme from './theme';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 30000,
    },
  },
});

// Navigation component
function Navigation() {
  const location = useLocation();
  const path = location.pathname;
  
  return (
    <AppBar position="static" elevation={0} sx={{ mb: 3, backgroundColor: 'white', color: 'text.primary' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700, color: theme.palette.primary.main }}>
          Social Analytics Dashboard
        </Typography>
        <Tabs value={path} textColor="primary" indicatorColor="primary">
          <Tab label="Top Users" value="/top-users" component={Link} to="/top-users" />
          <Tab label="Trending Posts" value="/trending" component={Link} to="/trending" />
          <Tab label="Feed" value="/feed" component={Link} to="/feed" />
        </Tabs>
      </Toolbar>
    </AppBar>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Box sx={{ 
            minHeight: '100vh', 
            backgroundColor: 'background.default',
            pb: 5
          }}>
            <Navigation />
            <Container maxWidth="lg">
              <Routes>
                <Route path="/top-users" element={<Leaderboard />} />
                <Route path="/trending" element={<TrendingPosts />} />
                <Route path="/feed" element={<Feed />} />
                <Route path="/" element={<Navigate to="/top-users" replace />} />
              </Routes>
            </Container>
          </Box>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;

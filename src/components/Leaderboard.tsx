import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Typography,
  Box,
  Paper,
  Avatar,
  List,
  ListItem,
  Skeleton,
  CircularProgress
} from '@mui/material';
import {
  EmojiEvents as TrophyIcon,
  Person as PersonIcon,
  TrendingUp as TrendingIcon
} from '@mui/icons-material';
import { fetchTopUsers } from '../services/api';
import { LeaderboardUser } from '../types';

const Leaderboard: React.FC = () => {
  const { data: users = [], isLoading, error } = useQuery<LeaderboardUser[]>({
    queryKey: ['topUsers'],
    queryFn: fetchTopUsers
  });

  const renderSkeletonItems = () => {
    return Array(5).fill(0).map((_, index) => (
      <ListItem key={`skeleton-${index}`} sx={{ py: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <Skeleton variant="circular" width={40} height={40} sx={{ mr: 2 }} />
          <Box sx={{ flexGrow: 1 }}>
            <Skeleton variant="text" width={120} />
            <Skeleton variant="text" width={80} sx={{ fontSize: '0.875rem' }} />
          </Box>
          <Skeleton variant="text" width={60} />
        </Box>
      </ListItem>
    ));
  };

  if (isLoading) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700, mb: 4, display: 'flex', alignItems: 'center' }}>
          <TrophyIcon sx={{ mr: 1.5, fontSize: 28 }} color="primary" />
          Top Users
        </Typography>
        
        <Paper sx={{ p: 3, mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress size={40} />
          </Box>
        </Paper>
        
        <Paper elevation={0} sx={{ overflow: 'hidden' }}>
          <List disablePadding>
            {renderSkeletonItems()}
          </List>
        </Paper>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700, mb: 4, display: 'flex', alignItems: 'center' }}>
          <TrophyIcon sx={{ mr: 1.5, fontSize: 28 }} color="primary" />
          Top Users
        </Typography>
        
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography color="error" align="center">
            Error loading top users. Please try again later.
          </Typography>
        </Paper>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700, mb: 4, display: 'flex', alignItems: 'center' }}>
        <TrophyIcon sx={{ mr: 1.5, fontSize: 28 }} color="primary" />
        Top Users
      </Typography>

      <Paper elevation={0} sx={{ overflow: 'hidden' }}>
        <List disablePadding>
          {users.map((user: LeaderboardUser, index: number) => {
            if (!user?.user) return null;
            
            const { name, username, avatar, company, role } = user.user;
            const { postCount, totalLikes, totalViews, engagement } = user;
            
            return (
              <ListItem 
                key={user.user.id} 
                sx={{ 
                  py: 2,
                  bgcolor: index === 0 ? 'primary.light' : 
                          index === 1 ? 'secondary.light' : 
                          index === 2 ? 'success.light' : 
                          'background.paper',
                  transition: 'background-color 0.2s',
                  '&:hover': {
                    bgcolor: index === 0 ? 'primary.light' : 
                            index === 1 ? 'secondary.light' : 
                            index === 2 ? 'success.light' : 
                            'action.hover'
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  <Box sx={{ position: 'relative', mr: 2 }}>
                    <Avatar 
                      src={avatar} 
                      alt={name}
                      sx={{ 
                        width: 48, 
                        height: 48,
                        border: '2px solid',
                        borderColor: index === 0 ? 'primary.main' : 
                                  index === 1 ? 'secondary.main' : 
                                  index === 2 ? 'success.main' : 
                                  'divider'
                      }}
                    />
                    {index < 3 && (
                      <Box
                        sx={{
                          position: 'absolute',
                          top: -8,
                          right: -8,
                          bgcolor: index === 0 ? 'primary.main' : 
                                  index === 1 ? 'secondary.main' : 
                                  'success.main',
                          color: 'white',
                          borderRadius: '50%',
                          width: 24,
                          height: 24,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.75rem',
                          fontWeight: 'bold',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                        }}
                      >
                        {index + 1}
                      </Box>
                    )}
                  </Box>
                  
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
                      {name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <PersonIcon fontSize="small" />
                      {role} at {company}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 0.5 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <TrendingIcon fontSize="small" color="primary" />
                      {postCount} posts
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {totalLikes.toLocaleString()} likes
                    </Typography>
                    {totalViews && (
                      <Typography variant="body2" color="text.secondary">
                        {totalViews.toLocaleString()} views
                      </Typography>
                    )}
                    {engagement && (
                      <Typography variant="body2" color="text.secondary">
                        {engagement.toFixed(1)}% engagement
                      </Typography>
                    )}
                  </Box>
                </Box>
              </ListItem>
            );
          })}
        </List>
      </Paper>
    </Box>
  );
};

export default Leaderboard; 
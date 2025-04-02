import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  Chip,
  Paper,
  CardMedia,
  CardActions,
  IconButton,
  Tooltip,
  Badge,
  Skeleton,
  Avatar
} from '@mui/material';
import {
  TrendingUp as TrendingIcon,
  Favorite as LikeIcon,
  Comment as CommentIcon,
  Share as ShareIcon,
  BookmarkBorder as SaveIcon
} from '@mui/icons-material';
import { fetchTrendingPosts } from '../services/api';
import { TrendingPost } from '../types';

const TrendingPosts: React.FC = () => {
  const { data: trendingPosts = [], isLoading, error } = useQuery<TrendingPost[]>({
    queryKey: ['trendingPosts'],
    queryFn: fetchTrendingPosts
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getRandomImage = (id: number) => {
    return `https://picsum.photos/seed/${id}/800/600`;
  };

  const renderSkeletonCards = () => {
    return Array(3).fill(0).map((_, index) => (
      <Box key={`skeleton-${index}`} sx={{ width: { xs: '100%', md: '50%', lg: '33.33%' }, px: 1.5, mb: 3 }}>
        <Card elevation={0} sx={{ height: '100%', borderRadius: 2 }}>
          <Skeleton variant="rectangular" height={200} sx={{ borderRadius: '8px 8px 0 0' }} />
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Skeleton variant="circular" width={40} height={40} />
              <Box sx={{ ml: 1 }}>
                <Skeleton variant="text" width={120} />
                <Skeleton variant="text" width={80} sx={{ fontSize: '0.875rem' }} />
              </Box>
            </Box>
            <Skeleton variant="text" height={32} sx={{ mt: 1, mb: 1 }} />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="text" width="60%" />
          </CardContent>
          <CardActions sx={{ px: 2, pb: 2 }}>
            <Skeleton variant="rounded" width={36} height={36} sx={{ mr: 1 }} />
            <Skeleton variant="rounded" width={36} height={36} sx={{ mr: 1 }} />
            <Skeleton variant="rounded" width={36} height={36} />
          </CardActions>
        </Card>
      </Box>
    ));
  };

  if (isLoading) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700, mb: 4, display: 'flex', alignItems: 'center' }}>
          <TrendingIcon sx={{ mr: 1.5, fontSize: 28 }} color="primary" />
          Trending Posts
        </Typography>
        
        <Paper sx={{ p: 3, mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress size={40} />
          </Box>
        </Paper>
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', mx: -1.5 }}>
          {renderSkeletonCards()}
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700, mb: 4, display: 'flex', alignItems: 'center' }}>
          <TrendingIcon sx={{ mr: 1.5, fontSize: 28 }} color="primary" />
          Trending Posts
        </Typography>
        
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography color="error" align="center">
            Error loading trending posts. Please try again later.
          </Typography>
        </Paper>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700, mb: 4, display: 'flex', alignItems: 'center' }}>
        <TrendingIcon sx={{ mr: 1.5, fontSize: 28 }} color="primary" />
        Trending Posts
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', mx: -1.5 }}>
        {trendingPosts.map((trendingPost: TrendingPost) => {
          if (!trendingPost?.post) return null;
          
          const post = trendingPost.post;
          // Add null checks
          const title = post.title || 'Untitled Post';
          const content = post.content || 'No content available';
          const createdAt = post.createdAt || new Date().toISOString();
          const likes = post.likes || 0;
          const commentCount = trendingPost.commentCount || 0;
          const user = post.user || { name: 'Unknown User', username: 'unknown', avatar: '' };
          
          return (
            <Box key={post.id} sx={{ width: { xs: '100%', md: '50%', lg: '33.33%' }, px: 1.5, mb: 3 }}>
              <Card elevation={0} sx={{ 
                height: '100%', 
                borderRadius: 2,
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
                }
              }}>
                <CardMedia
                  component="img"
                  height="180"
                  image={getRandomImage(post.id)}
                  alt={title}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar 
                      src={user.avatar} 
                      alt={user.name}
                    />
                    <Box sx={{ ml: 1.5 }}>
                      <Typography variant="subtitle1" sx={{ lineHeight: 1.2, fontWeight: 600 }}>
                        {user.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        @{user.username}
                      </Typography>
                    </Box>
                    <Box sx={{ ml: 'auto' }}>
                      <Chip
                        label={formatDate(createdAt)}
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: '0.7rem' }}
                      />
                    </Box>
                  </Box>
                  
                  <Typography 
                    variant="h6" 
                    gutterBottom
                    sx={{ 
                      fontWeight: 600, 
                      fontSize: '1.1rem',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      lineHeight: 1.3,
                      height: '2.6rem'
                    }}
                  >
                    {title}
                  </Typography>
                  
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ 
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      mb: 1,
                      height: '4.5rem',
                      whiteSpace: 'pre-line'
                    }}
                  >
                    {content}
                  </Typography>
                </CardContent>
                
                <CardActions sx={{ px: 2, pb: 2 }}>
                  <Tooltip title={`${likes} likes`}>
                    <IconButton aria-label="like" color="secondary">
                      <Badge badgeContent={likes} color="secondary" max={999}>
                        <LikeIcon />
                      </Badge>
                    </IconButton>
                  </Tooltip>
                  
                  <Tooltip title={`${commentCount} comments`}>
                    <IconButton aria-label="comments" color="primary">
                      <Badge badgeContent={commentCount} color="primary" max={999}>
                        <CommentIcon />
                      </Badge>
                    </IconButton>
                  </Tooltip>
                  
                  <Tooltip title="Share">
                    <IconButton aria-label="share">
                      <ShareIcon />
                    </IconButton>
                  </Tooltip>
                  
                  <Tooltip title="Save">
                    <IconButton aria-label="save" sx={{ ml: 'auto' }}>
                      <SaveIcon />
                    </IconButton>
                  </Tooltip>
                </CardActions>
              </Card>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default TrendingPosts; 
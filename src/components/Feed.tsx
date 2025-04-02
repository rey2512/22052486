import React, { useState, ChangeEvent } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  Chip,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  Paper,
  CardMedia,
  CardActions,
  IconButton,
  Tooltip,
  InputAdornment,
  Badge,
  Skeleton,
  Button,
  Avatar
} from '@mui/material';
import {
  Search as SearchIcon,
  Sort as SortIcon,
  Favorite as LikeIcon,
  Comment as CommentIcon,
  Share as ShareIcon,
  BookmarkBorder as SaveIcon,
  Refresh as RefreshIcon,
  DynamicFeed as FeedIcon
} from '@mui/icons-material';
import { fetchFeedPosts } from '../services/api';
import { Post } from '../types';

const Feed: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortBy, setSortBy] = useState<'date' | 'likes' | 'comments'>('date');

  const { data = [], isLoading, error, refetch } = useQuery<Post[]>({
    queryKey: ['feedPosts', page],
    queryFn: () => fetchFeedPosts(page),
    staleTime: 30000, // Data is fresh for 30 seconds
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  const posts = data as Post[];

  // Get a random image for each post based on post ID
  const getRandomImage = (id: number): string => {
    const categories = ['business', 'technology', 'office', 'work', 'marketing', 'computer', 'social', 'digital'];
    const category = categories[id % categories.length];
    return `https://source.unsplash.com/400x225/?${category}`;
  };

  // Add null check for posts before filtering/sorting
  const filteredAndSortedPosts = posts
    .filter((post: Post) => {
      if (!post) return false;
      const title = post.title || '';
      const content = post.content || '';
      return title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        content.toLowerCase().includes(searchTerm.toLowerCase());
    })
    .sort((a: Post, b: Post) => {
      if (!a || !b) return 0;
      switch (sortBy) {
        case 'likes':
          return (b.likes || 0) - (a.likes || 0);
        case 'comments':
          return (b.commentCount || 0) - (a.commentCount || 0);
        default:
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          return dateB - dateA;
      }
    });

  const handleRefresh = () => {
    refetch();
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

  if (isLoading && posts.length === 0) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700, mb: 4, display: 'flex', alignItems: 'center' }}>
          <FeedIcon sx={{ mr: 1.5, fontSize: 28 }} color="primary" />
          Real-time Feed
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
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          Real-time Feed
        </Typography>
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography color="error">
            Error loading feed data. Please try again later.
          </Typography>
          <Button 
            variant="outlined" 
            color="primary" 
            startIcon={<RefreshIcon />}
            onClick={handleRefresh}
            sx={{ mt: 2 }}
          >
            Retry
          </Button>
        </Paper>
      </Box>
    );
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Unknown date';
    
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4, flexWrap: 'wrap', gap: 2 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700, display: 'flex', alignItems: 'center' }}>
          <FeedIcon sx={{ mr: 1.5, fontSize: 28 }} color="primary" />
          Real-time Feed
        </Typography>
        
        <Tooltip title="Refresh feed">
          <IconButton onClick={handleRefresh} color="primary" size="large">
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      </Box>
      
      <Paper elevation={0} sx={{ p: 3, mb: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
          <Box sx={{ flexGrow: 1, width: { xs: '100%', md: '66.67%' } }}>
            <TextField
              fullWidth
              placeholder="Search posts by title or content..."
              value={searchTerm}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              size="medium"
            />
          </Box>
          <Box sx={{ width: { xs: '100%', md: '33.33%' } }}>
            <FormControl fullWidth variant="outlined" size="medium">
              <InputLabel id="sort-label">Sort By</InputLabel>
              <Select
                labelId="sort-label"
                value={sortBy}
                label="Sort By"
                onChange={(e: SelectChangeEvent) => setSortBy(e.target.value as typeof sortBy)}
                startAdornment={
                  <InputAdornment position="start">
                    <SortIcon color="action" />
                  </InputAdornment>
                }
              >
                <MenuItem value="date">Most Recent</MenuItem>
                <MenuItem value="likes">Most Liked</MenuItem>
                <MenuItem value="comments">Most Commented</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Paper>
      
      {filteredAndSortedPosts.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary">No posts match your search</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            Try adjusting your search terms or clear the search field to see all posts
          </Typography>
        </Paper>
      ) : (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', mx: -1.5 }}>
          {filteredAndSortedPosts.map((post: Post) => {
            if (!post) return null;
            
            // Add null checks
            const title = post.title || 'Untitled Post';
            const content = post.content || 'No content available';
            const createdAt = post.createdAt || new Date().toISOString();
            const likes = post.likes || 0;
            const commentCount = post.commentCount || 0;
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
      )}
      
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Button 
          variant="outlined" 
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </Button>
        <Button 
          variant="contained" 
          onClick={() => setPage(page + 1)}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default Feed; 
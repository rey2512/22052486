import axios from 'axios';
import { User, Post, Comment, LeaderboardUser, TrendingPost } from '../types';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com'; // Example API URL

// Your API token
const API_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQzNjExMDc2LCJpYXQiOjE3NDM2MTA3NzYsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImU5YjhiZDUxLWQyNmMtNDUyMi04M2UyLTU1Nzg0NjBlNjgzMSIsInN1YiI6IjIyMDUyNDg2QGtpaXQuYWMuaW4ifSwiZW1haWwiOiIyMjA1MjQ4NkBraWl0LmFjLmluIiwibmFtZSI6InByYXNlbmplZXQgc2luZ2giLCJyb2xsTm8iOiIyMjA1MjQ4NiIsImFjY2Vzc0NvZGUiOiJud3B3cloiLCJjbGllbnRJRCI6ImU5YjhiZDUxLWQyNmMtNDUyMi04M2UyLTU1Nzg0NjBlNjgzMSIsImNsaWVudFNlY3JldCI6IldKWEFZeE5ZVW13ekhUclMifQ.HPEv05sC9L8EcADrUPt_zCLwBbAT7YwQmgsq0SAiRtw";

// Create axios instance with token
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_TOKEN}` // Add token to headers
  },
});

// List of professional avatar URLs - using professional photo stock library
const AVATAR_URLS = [
  'https://randomuser.me/api/portraits/men/32.jpg',
  'https://randomuser.me/api/portraits/women/44.jpg',
  'https://randomuser.me/api/portraits/men/86.jpg',
  'https://randomuser.me/api/portraits/women/63.jpg',
  'https://randomuser.me/api/portraits/men/17.jpg',
  'https://randomuser.me/api/portraits/women/37.jpg',
  'https://randomuser.me/api/portraits/men/72.jpg',
  'https://randomuser.me/api/portraits/women/28.jpg',
  'https://randomuser.me/api/portraits/men/41.jpg',
  'https://randomuser.me/api/portraits/women/90.jpg',
];

// company names
const COMPANY_NAMES = [
  'Apex Innovations',
  'BlueWave Solutions',
  'CoreTech Systems',
  'DataSphere Analytics',
  'EnviroTech Global',
  'Fusion Technologies',
  'GrowthPath Ventures',
  'Horizon Enterprises',
  'Insight Partners',
  'Junction Capital',
];

// Professional post titles
const PROFESSIONAL_TITLES = [
  'Leveraging Social Analytics for Business Growth',
  'The Future of Social Media Marketing',
  'Implementing Effective Influencer Strategies',
  'Social Media Best Practices for 2025',
  'Engagement Analytics: What You Need to Know',
  'Building Brand Loyalty Through Social Channels',
  'Strategic Content Planning for Social Media',
  'Building Engaged Communities Online',
  'Measuring Social ROI: Advanced Techniques',
  'Customer Acquisition Through Social Platforms',
  'Social Media Crisis Management',
  'Content Strategy Success Stories',
  'The Impact of AI on Social Media Management',
  'Cross-Platform Social Strategy',
  'Social Media Data Privacy Best Practices',
];

// Professional comment contents
const PROFESSIONAL_COMMENTS = [
  'Excellent analysis. This aligns with what we have been seeing in our industry as well.',
  'I appreciate the insights shared here. Have you considered the implications for smaller businesses?',
  'The data visualization really helps to understand the trends. Great work!',
  'This is a valuable perspective. I would be interested in seeing how these patterns evolve over the next quarter.',
  'Your point about cross-functional collaboration is spot-on. We have implemented similar approaches with positive results.',
  'I would like to add that regulatory considerations will play a major role in how these strategies are implemented.',
  'This research complements our recent findings. Would love to discuss potential synergies.',
  'The ROI metrics presented here are compelling. Have you published any case studies on this approach?',
  'Insightful presentation of complex data. The executive summary particularly resonated with our team.',
  'The strategic framework outlined here has practical applications across various sectors. Well done.',
];

// Get random date between 1 day ago and 30 days ago
const getRandomDate = () => {
  const now = new Date();
  const daysBack = Math.floor(Math.random() * 30) + 1;
  const randomDate = new Date(now);
  randomDate.setDate(now.getDate() - daysBack);
  randomDate.setHours(Math.floor(Math.random() * 24));
  randomDate.setMinutes(Math.floor(Math.random() * 60));
  return randomDate.toISOString();
};

// Generate professional content
const generateProfessionalContent = () => {
  const paragraphs = [
    'Our analysis shows that companies actively engaging with their audience on social media are 43% more likely to see increased brand loyalty and customer retention.',
    'Strategic social media campaigns that align with core business values have shown a 61% higher conversion rate compared to generic content strategies.',
    'The integration of social listening tools has demonstrated a 32% improvement in customer sentiment and positive brand perception across multiple platforms.',
    'Recent research indicates that brands responding to customer inquiries within 1 hour on social media see a 38% higher satisfaction score.',
    'Expert consensus suggests that video content on social platforms generates 48% more engagement than static images, with short-form videos leading the trend.',
    'Organizations that prioritize authentic user-generated content report 29% higher trust scores and more sustainable community growth.',
    'The implementation of consistent posting schedules has been shown to increase follower growth by up to 57% for B2B brands on professional networks.',
    'According to our latest survey, companies with diverse content strategies across multiple platforms report 41% higher overall social media ROI than single-platform focused brands.',
  ];
  
  const numParagraphs = Math.floor(Math.random() * 2) + 1; // 1-2 paragraphs
  const selectedParagraphs = [];
  
  for (let i = 0; i < numParagraphs; i++) {
    const randomIndex = Math.floor(Math.random() * paragraphs.length);
    selectedParagraphs.push(paragraphs[randomIndex]);
  }
  
  return selectedParagraphs.join('\n\n');
};

// Enhanced user data with professional information
const enhanceUserData = (user: any): User => {
  const companyIndex = user.id % COMPANY_NAMES.length;
  return {
    ...user,
    name: user.name,
    username: user.username.toLowerCase(),
    email: user.email.toLowerCase(),
    avatar: AVATAR_URLS[user.id % AVATAR_URLS.length],
    postCount: Math.floor(Math.random() * 80) + 20, // 20-100 posts
    company: COMPANY_NAMES[companyIndex],
    role: ['CEO', 'CTO', 'CFO', 'CMO', 'Director', 'VP', 'Manager'][user.id % 7],
  };
};

// Enhanced post data with professional content
const enhancePostData = (post: any, users: User[]): Post => {
  const user = users.find(u => u.id === post.userId) || users[0];
  const randomTitleIndex = post.id % PROFESSIONAL_TITLES.length;
  return {
    ...post,
    title: PROFESSIONAL_TITLES[randomTitleIndex],
    content: generateProfessionalContent(),
    createdAt: getRandomDate(),
    commentCount: Math.floor(Math.random() * 40) + 5, // 5-45 comments
    likes: Math.floor(Math.random() * 150) + 50, // 50-200 likes
    user,
  };
};

// Enhanced comment data
const enhanceCommentData = (comment: any, users: User[]): Comment => {
  // Randomly assign a user ID from our available users
  const randomUserId = users[Math.floor(Math.random() * users.length)].id;
  const user = users.find(u => u.id === randomUserId) || users[0];
  
  // Use professional comment content
  const commentIndex = comment.id % PROFESSIONAL_COMMENTS.length;

  return {
    ...comment,
    userId: user.id,
    content: PROFESSIONAL_COMMENTS[commentIndex],
    createdAt: getRandomDate(),
    user,
  };
};

export const fetchTopUsers = async (): Promise<LeaderboardUser[]> => {
  try {
    const response = await api.get('/users');
    const users = response.data.map(enhanceUserData);
    
    // Create leaderboard data with realistic metrics
    return users.slice(0, 10).map((user: User) => ({
      user,
      postCount: user.postCount,
      totalLikes: Math.floor(Math.random() * 2000) + 500, // 500-2500 total likes
      totalViews: Math.floor(Math.random() * 50000) + 10000, // 10k-60k views
      engagement: Math.random() * 15 + 5, // 5-20% engagement rate
    }))
    .sort((a: LeaderboardUser, b: LeaderboardUser) => b.postCount - a.postCount)
    .slice(0, 5); // Get top 5 by post count
  } catch (error) {
    console.error('Error fetching top users:', error);
    throw error;
  }
};

export const fetchTrendingPosts = async (): Promise<TrendingPost[]> => {
  try {
    const [usersResponse, postsResponse, commentsResponse] = await Promise.all([
      api.get('/users'),
      api.get('/posts'),
      api.get('/comments'),
    ]);

    const users = usersResponse.data.map(enhanceUserData);
    
    // First enhance the posts with professional content
    const enhancedPosts = postsResponse.data.map((post: any) => enhancePostData(post, users));
    
    // Then enhance the comments and ensure they have proper user information
    const enhancedComments = commentsResponse.data.map((comment: any) => enhanceCommentData(comment, users));

    // Group comments by post
    const commentsByPost: Record<number, Comment[]> = {};
    enhancedComments.forEach((comment: Comment) => {
      if (!commentsByPost[comment.postId]) {
        commentsByPost[comment.postId] = [];
      }
      commentsByPost[comment.postId].push(comment);
    });

    // Create trending posts with comment counts
    const trendingPosts = enhancedPosts.map((post: Post) => {
      const postComments = commentsByPost[post.id] || [];
      return {
        post,
        commentCount: postComments.length,
        recentComments: postComments
          .sort((a: Comment, b: Comment) => 
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .slice(0, 3), // Get 3 most recent comments
      };
    })
    .sort((a: TrendingPost, b: TrendingPost) => b.commentCount - a.commentCount) // Sort by comment count
    .slice(0, 5); // Get top 5 trending posts
    
    return trendingPosts;
  } catch (error) {
    console.error('Error fetching trending posts:', error);
    throw error;
  }
};

export const fetchFeedPosts = async (page: number = 1): Promise<Post[]> => {
  try {
    const [usersResponse, postsResponse] = await Promise.all([
      api.get('/users'),
      api.get(`/posts?_page=${page}&_limit=10`),
    ]);
    
    const users = usersResponse.data.map(enhanceUserData);
    const posts = postsResponse.data.map((post: any) => enhancePostData(post, users));

    // Simulate newer posts for real-time feed by adjusting dates
    // Make first post very recent if it's page 1
    if (page === 1 && posts.length > 0) {
      const minutesAgo = Math.floor(Math.random() * 30); // 0-30 minutes ago
      const recentDate = new Date();
      recentDate.setMinutes(recentDate.getMinutes() - minutesAgo);
      posts[0].createdAt = recentDate.toISOString();
    }
    
    // Sort by date, newest first
    return posts.sort((a: Post, b: Post) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } catch (error) {
    console.error('Error fetching feed posts:', error);
    throw error;
  }
};
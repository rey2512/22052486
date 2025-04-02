export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  avatar: string;
  postCount: number;
  company?: string;
  role?: string;
  website?: string;
  phone?: string;
  address?: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
}

export interface Post {
  id: number;
  userId: number;
  title: string;
  content: string;
  createdAt: string;
  commentCount: number;
  likes: number;
  user: User;
  tags?: string[];
  category?: string;
  imageUrl?: string;
}

export interface Comment {
  id: number;
  postId: number;
  userId: number;
  content: string;
  createdAt: string;
  user: User;
  likes?: number;
}

export interface LeaderboardUser {
  user: User;
  postCount: number;
  totalLikes: number;
  totalViews?: number;
  engagement?: number;
  followers?: number;
  ranking?: number;
}

export interface TrendingPost {
  post: Post;
  commentCount: number;
  recentComments: Comment[];
  trend?: 'rising' | 'stable' | 'falling';
  trendPercentage?: number;
} 
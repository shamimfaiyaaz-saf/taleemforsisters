
export enum VideoCategory {
  QURAN = 'কুরআন',
  HADITH = 'হাদিস',
  FIQH = 'ধর্মীয়',
  ADVICE = 'দৈনিক নসিহাহ',
  LIFESTYLE = 'জীবন যাপন'
}

export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  url: string;
  category: VideoCategory;
  duration: string;
  views: string;
  date: string;
}

export type ContentStatus = 'pending' | 'approved' | 'rejected';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorEmail?: string; // To track who posted it
  date: string;
  imageUrl: string;
  tags: string[];
  status: ContentStatus;
  isFlagged?: boolean;
  reportReason?: string;
  viewCount?: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'moderator' | 'editor' | 'user';
  password?: string; // In a real app, never store plain text passwords
  isBlocked?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  location: string;
  date: string;
  email?: string; // To identify who wrote the review
  status: ContentStatus;
  isFlagged?: boolean;
  reportReason?: string;
}

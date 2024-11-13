// src/types/search.ts

export interface Channel {
  id: string;
  name: string;
  avatarUrl: string;
  isVerified: boolean;
  subscribers: number;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  views: number;
  likeCount: number;
  dislikeCount: number;
  commentCount: number;
  subscriberCount: number;
  createdAt: string; // Or `Date` if you parse dates on the frontend
  channel: Channel;
  thumbnailUrl: string;
  previewGif: string;
  videoUrl: string;
}

export interface SearchResponse {
  results: Video[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

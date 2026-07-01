export interface Article {
  id: string;
  title: string;
  category: string;
  author: string;
  date: string;
  summary: string;
  content: string; // HTML or Markdown formatted content
  views?: number;
  likes?: number;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  interests: string[];
  joinDate: string;
  bio?: string;
  role: string;
  avatarEmoji: string;
}

export interface Society {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  featuredQuestions: string[];
  membersCount: number;
  projectsCount: number;
}

export interface Question {
  id: string;
  text: string;
  likes: number;
  category: string;
  createdAt: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  author: string;
  status: 'Planning' | 'In Progress' | 'Completed' | 'Idea';
  openRoles: string[];
  membersCount: number;
}

export interface ClubEvent {
  id: string;
  title: string;
  description: string;
  month: string;
  day: string;
  location: string;
  details: string[];
  isSignature?: boolean;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Post {
  id: number;
  createdAt: string;
  content: string;
  user: User;
  comments: Comment[];
}


export interface Comment {
  id: number;
  createdAt: string;
  content: string;
  user: User;
}

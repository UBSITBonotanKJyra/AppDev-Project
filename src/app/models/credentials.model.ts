export interface Credential {
  id: string;
  siteName: string;
  username: string;
  password: string;
  category: 'Work' | 'Social' | 'Banking' | 'Personal';
  isLeaked?: boolean; 
}

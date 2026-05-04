export interface Credential {
  id: string;
  siteName: string;
  siteUrl: string;
  username: string;
  password: string;
  category: 'Work' | 'Social' | 'Banking' | 'Personal';
  isLeaked?: boolean; 
}

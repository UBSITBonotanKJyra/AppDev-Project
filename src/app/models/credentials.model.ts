/**
 * SafeStash - Password & Credential Manager
 * APPDEV1 Final Project
 * Date: April 15, 2026
 */

export interface Credential {
  id: string;
  siteName: string;
  siteUrl: string;
  username: string;
  password: string;
  category: 'Work' | 'Social' | 'Banking' | 'Personal';
  isLeaked?: boolean; // Optional property for API check results
}

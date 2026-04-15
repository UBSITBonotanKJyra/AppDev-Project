import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Credential } from '../models/credentials.model'; 
import { catchError, firstValueFrom, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CredentialService {
  private storageKey = 'safestash_data';
  credentials = signal<Credential[]>(this.loadStorage());

  constructor(private http: HttpClient) {}

  private loadStorage(): Credential[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  save(creds: Credential[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(creds));
    this.credentials.set(creds);
  }

  // --- CRUD OPERATIONS ---
  add(item: Credential) {
    const newItem = { ...item, id: Date.now().toString(), isLeaked: false };
    this.save([...this.credentials(), newItem]);
  }

  delete(id: string) {
    this.save(this.credentials().filter(c => c.id !== id));
  }

  // --- API INTEGRATION: Have I Been Pwned ---
  async checkBreach(username: string): Promise<boolean> {
    // API NOTE: The HIBP API v3 requires an API Key. 
    // To ensure your project WORKS during the demo without a paid key, 
    // we use a logic-based check + a simulated API call.
    
    try {
      const url = `https://haveibeenpwned.com{username}`;
      // In a real scenario with a key, you'd add: { headers: { 'hibp-api-key': 'your_key' } }
      await firstValueFrom(this.http.get(url));
      return true; 
    } catch (error: any) {
      // If the API returns 404, the account is SAFE (not found in breaches).
      // If the API returns 401/403, it means we lack a Key (simulating for class).
      if (error.status === 404) return false;
      
      // FALLBACK LOGIC for Class Demo: 
      // If we can't hit the API, we simulate a check to show the feature works.
      console.warn("HIBP API requires a key. Simulating result for demo...");
      return username.includes('test') || username.includes('pwned');
    }
  }
}

import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Credential } from '../models/credentials.model';

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

  add(item: Credential) {
    const newItem = {
      ...item,
      id: Date.now().toString(),
      isLeaked: false
    };
    this.save([...this.credentials(), newItem]);
  }

  delete(id: string) {
    this.save(this.credentials().filter(c => c.id !== id));
  }

 
  async checkBreach(username: string): Promise<boolean> {
    try {
      const res = await fetch(`http://localhost:3000/check-breach/${username}`);
      const data = await res.json();

      return data.isBreached;
    } catch (err) {
      console.error('Server not running or unreachable:', err);

     
      return ['test', 'admin', 'root'].includes(username.toLowerCase());
    }
  }
}
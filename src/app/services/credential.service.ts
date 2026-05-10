import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Credential } from '../models/credentials.model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CredentialService {

  apiUrl = 'http://localhost:3000';

  credentials = signal<Credential[]>([]);

  constructor(private http: HttpClient) {}

  async add(item: Credential) {
    try {
      const response = await firstValueFrom(
        this.http.post<any>(
          `${this.apiUrl}/save-password`,
          {
            username: item.username,
            siteName: item.siteName,
            password: item.password
          }
        )
      );

      console.log('Saved:', response);

      this.loadPasswords();

    } catch (error) {
      console.error(error);
    }
  }

  async loadPasswords() {
    try {
      const data = await firstValueFrom(
        this.http.get<Credential[]>(
          `${this.apiUrl}/passwords`
        )
      );

      this.credentials.set(data);

    } catch (error) {
      console.error(error);
    }
  }

  async delete(id: string) {
    try {
      await firstValueFrom(
        this.http.delete(
          `${this.apiUrl}/delete-password/${id}`
        )
      );

      this.loadPasswords();

    } catch (error) {
      console.error(error);
    }
  }

  async checkBreach(username: string): Promise<boolean> {
    try {
      const res: any = await firstValueFrom(
        this.http.get(
          `${this.apiUrl}/check-breach/${username}`
        )
      );

      return res.isBreached;

    } catch (error) {
      console.error(error);

      return false;
    }
  }

  async updateLeakStatus(id: string, isLeaked: boolean) {
    try {
      await firstValueFrom(
        this.http.put(
          `${this.apiUrl}/update-leak/${id}`,
          { isLeaked }
        )
      );

    } catch (error) {
      console.error(error);
    }
  }
}
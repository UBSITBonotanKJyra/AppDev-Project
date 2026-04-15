import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CredentialService } from '../../services/credential.service';
import { Credential } from '../../models/credentials.model'; 
import { SecurityStatusComponent } from '../security-status/security-status.component'; // Import this!

@Component({
  selector: 'app-vault-dashboard',
  standalone: true,
  imports: [CommonModule, SecurityStatusComponent], // Add it here!
  templateUrl: './vault-dashboard.component.html',
  styleUrls: ['./vault-dashboard.component.css']
})
export class VaultDashboardComponent {
  service = inject(CredentialService);
  visiblePasswords = new Set<string>();

  togglePassword(id: string) {
    if (this.visiblePasswords.has(id)) {
      this.visiblePasswords.delete(id);
    } else {
      this.visiblePasswords.add(id);
    }
  }

  async checkSecurity(item: Credential) {
    // Show a small loading hint if you want, but for now:
    const leaked = await this.service.checkBreach(item.username);
    item.isLeaked = leaked;
    
    // Save state back to local storage
    this.service.save([...this.service.credentials()]);
  }
}

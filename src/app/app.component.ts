import { Component } from '@angular/core';
import { CredentialFormComponent } from './components/credential-form/credential-form.component';
import { VaultDashboardComponent } from './components/vault-dashboard/vault-dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CredentialFormComponent, VaultDashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SafeStash';
}

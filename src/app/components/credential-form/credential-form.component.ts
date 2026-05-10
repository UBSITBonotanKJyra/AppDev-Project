
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CredentialService } from '../../services/credential.service';
import { Credential } from '../../models/credentials.model'; 

@Component({
  selector: 'app-credential-form',
  standalone: true,
  imports: [FormsModule], 
  templateUrl: './credential-form.component.html', 
  styleUrls: ['./credential-form.component.css']
})
export class CredentialFormComponent {
  service = inject(CredentialService);

  newEntry: Credential = {
    siteName: '',
    username: '',
    password: '',
    category: 'Personal',
    isLeaked: false
  };

  submit() {
    if(this.newEntry.siteName && this.newEntry.password) {
      this.service.add({...this.newEntry});
      alert('Credential saved to vault!'); 
      this.reset();
    } else {
      alert('Please fill in the required fields.');
    }
  }

  reset() {
    this.newEntry = { siteName: '', username: '', password: '', category: 'Personal', isLeaked: false };
  }
}

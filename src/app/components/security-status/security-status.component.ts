import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-security-status',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './security-status.component.html',
  styleUrls: ['./security-status.component.css']
})
export class SecurityStatusComponent {
  @Input() isLeaked: boolean = false;
}
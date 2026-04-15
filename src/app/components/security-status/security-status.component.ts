import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-security-status',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="status-badge" [ngClass]="isLeaked ? 'leaked' : 'safe'">
      {{ isLeaked ? '⚠️ BREACH FOUND' : '✅ SECURE' }}
    </div>
  `,
  styles: [`
    .status-badge {
      font-size: 0.7rem;
      font-weight: bold;
      padding: 4px 8px;
      border-radius: 12px;
      display: inline-block;
      margin-top: 5px;
    }
    .safe { background: #065f46; color: #34d399; }
    .leaked { background: #991b1b; color: #f87171; }
  `]
})
export class SecurityStatusComponent {
  @Input() isLeaked: boolean = false;
}

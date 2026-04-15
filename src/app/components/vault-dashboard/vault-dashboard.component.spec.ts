import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaultDashboardComponent } from './vault-dashboard.component';

describe('VaultDashboardComponent', () => {
  let component: VaultDashboardComponent;
  let fixture: ComponentFixture<VaultDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VaultDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VaultDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

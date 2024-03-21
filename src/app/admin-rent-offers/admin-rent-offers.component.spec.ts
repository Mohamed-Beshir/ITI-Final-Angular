import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRentOffersComponent } from './admin-rent-offers.component';

describe('AdminRentOffersComponent', () => {
  let component: AdminRentOffersComponent;
  let fixture: ComponentFixture<AdminRentOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminRentOffersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminRentOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

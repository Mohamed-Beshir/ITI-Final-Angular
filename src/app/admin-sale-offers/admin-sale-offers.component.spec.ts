import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSaleOffersComponent } from './admin-sale-offers.component';

describe('AdminSaleOffersComponent', () => {
  let component: AdminSaleOffersComponent;
  let fixture: ComponentFixture<AdminSaleOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminSaleOffersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminSaleOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

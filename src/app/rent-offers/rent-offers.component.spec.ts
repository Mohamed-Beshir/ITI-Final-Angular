import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentOffersComponent } from './rent-offers.component';

describe('RentOffersComponent', () => {
  let component: RentOffersComponent;
  let fixture: ComponentFixture<RentOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentOffersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RentOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

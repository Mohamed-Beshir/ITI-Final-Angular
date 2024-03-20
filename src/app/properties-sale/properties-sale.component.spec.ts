import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertiesSaleComponent } from './properties-sale.component';

describe('PropertiesSaleComponent', () => {
  let component: PropertiesSaleComponent;
  let fixture: ComponentFixture<PropertiesSaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertiesSaleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PropertiesSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

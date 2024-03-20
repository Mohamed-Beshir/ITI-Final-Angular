import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyLineCardComponent } from './property-line-card.component';

describe('PropertyLineCardComponent', () => {
  let component: PropertyLineCardComponent;
  let fixture: ComponentFixture<PropertyLineCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertyLineCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PropertyLineCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

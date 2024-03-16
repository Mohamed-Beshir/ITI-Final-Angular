import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestsPropertiesComponent } from './requests-properties.component';

describe('RequestsPropertiesComponent', () => {
  let component: RequestsPropertiesComponent;
  let fixture: ComponentFixture<RequestsPropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestsPropertiesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequestsPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOfferedPropertiesComponent } from './user-offered-properties.component';

describe('UserOfferedPropertiesComponent', () => {
  let component: UserOfferedPropertiesComponent;
  let fixture: ComponentFixture<UserOfferedPropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserOfferedPropertiesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserOfferedPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InnerfooterComponent } from './innerfooter.component';

describe('InnerfooterComponent', () => {
  let component: InnerfooterComponent;
  let fixture: ComponentFixture<InnerfooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InnerfooterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InnerfooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

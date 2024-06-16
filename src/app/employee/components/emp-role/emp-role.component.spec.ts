import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpRoleComponent } from './emp-role.component';

describe('EmpRoleComponent', () => {
  let component: EmpRoleComponent;
  let fixture: ComponentFixture<EmpRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpRoleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmpRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

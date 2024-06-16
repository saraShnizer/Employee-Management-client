import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEmpRoleComponent } from './edit-emp-role.component';

describe('EditEmpRoleComponent', () => {
  let component: EditEmpRoleComponent;
  let fixture: ComponentFixture<EditEmpRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditEmpRoleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditEmpRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

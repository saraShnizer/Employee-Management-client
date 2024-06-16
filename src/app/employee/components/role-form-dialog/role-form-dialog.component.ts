import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AbstractControl } from '@angular/forms';
import { Role } from '../../../role/role.model';
import { EmployeesService } from '../../employees.service';
import { EmployeeRolePost } from '../../employeeRolePost.model';

@Component({
  selector: 'app-role-form-dialog',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatRadioModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatAutocompleteModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent
  ],
  templateUrl: './role-form-dialog.component.html',
  styleUrls: ['./role-form-dialog.component.css']
})
export class RoleFormDialogComponent implements OnInit {
  availableRoles: Role[];
  newEmpRoleForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<RoleFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { availableRoles: Role[], employeeId: number },
    private formBuilder: FormBuilder,
    private employeesService: EmployeesService
  ) {
    this.availableRoles = data.availableRoles;
  }

  ngOnInit(): void {
    this.newEmpRoleForm = this.formBuilder.group({
      roleId: ['', Validators.required],
      startDate: ['', [Validators.required]],
      isAdmin: [false]
    });
  }

  validateStartDate(control: AbstractControl<any>): { [key: string]: any } | null {
    const selectedDate: Date = new Date(control.value);
    if (selectedDate >= new Date()) {
      return null;
    } else {
      return { invalidDate: true };
    }
  }

  toggleAdmin(checked: boolean) {
    this.newEmpRoleForm.patchValue({
      isAdmin: checked
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addEmpRole() {
    const newEmpRole: EmployeeRolePost = {
      roleId: this.newEmpRoleForm.value.roleId,
      startDate: this.newEmpRoleForm.value.startDate,
      isAdmin: this.newEmpRoleForm.value.isAdmin
    };

    this.employeesService.addRoleToEmployee(this.data.employeeId, newEmpRole).subscribe({
      next: (response: any) => {
        this.dialogRef.close(response.data);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}

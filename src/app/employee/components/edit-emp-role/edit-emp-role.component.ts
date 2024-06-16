import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogActions } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import { EmployeeRolePost } from '../../employeeRolePost.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-edit-emp-role',
  standalone: true,
  imports: [
    
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatDialogActions,
    // MatDialogRef,
    MatNativeDateModule
  ],
  templateUrl: './edit-emp-role.component.html',
  styleUrls: ['./edit-emp-role.component.css']
})
export class EditEmpRoleComponent implements OnInit {
  editRoleForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditEmpRoleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { role: EmployeeRolePost },
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    console.log('Incoming date:', this.data.role.startDate);

    this.editRoleForm = this.fb.group({
      startDate: [this.data.role.startDate, Validators.required],
      isAdmin: [this.data.role.isAdmin]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    console.log(this.editRoleForm.value);
    if (this.editRoleForm.valid) {
      this.dialogRef.close(this.editRoleForm.value);
    }
  }

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    // Update form control
    this.editRoleForm.get('startDate')?.setValue(event.value);
    console.log('Updated form control value:', this.editRoleForm.value);
  }

  toggleAdmin(isAdmin: boolean): void {
    this.editRoleForm.get('isAdmin')?.setValue(isAdmin);
  }
}

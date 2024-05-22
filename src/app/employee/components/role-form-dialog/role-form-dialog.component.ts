import { Component, OnInit, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
import { RolesService } from '../../../role/roles.service';
import { EmployeeRolePost } from '../../employeeRolePost.model';

import { RolePost } from '../../../role/rolePost.model';
import { EmployeesService } from '../../employees.service';
import { EmployeeRole } from '../../employeeRole.model';

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
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    MatSlideToggleModule,
    MatAutocompleteModule,


  ],
  templateUrl: './role-form-dialog.component.html',
  styleUrl: './role-form-dialog.component.css'
})
export class RoleFormDialogComponent implements OnInit {
  roles!: Role[];
  myData!: EmployeeRole;
  selectedRoles: string[] = [];
  workStartDate!: Date;
  empId!: number;
  roleId!: number;


  newEmpRoleForm!: FormGroup ;


   constructor(
    public dialogRef: MatDialogRef<RoleFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EmployeeRole,
    private formBuilder: FormBuilder,
    private roleService: RolesService,
    private employeesService: EmployeesService
  ) {}

  ngOnInit(): void
   {
   this.newEmpRoleForm= this.formBuilder.group({
      name: new FormControl("", Validators.required),
      startDate: new FormControl("", [Validators.required]),
      isAdmin: new FormControl(false),
   });
   this.getRoles();
   this.newEmpRoleForm.get('startDate')?.valueChanges.subscribe(()=>{
    this.validateStartDate
   })
  }

  initForm(): void {
    this.newEmpRoleForm = this.formBuilder.group({
      name: new FormControl("", Validators.required),
      startDate: new FormControl("", [Validators.required, this.validateStartDate.bind(this)]),
      isAdmin: new FormControl(false)
    });
  }

  getRoles(): void {
    this.roleService.getRolesList().subscribe({
      next: (roles: Role[]) => {
        this.roles = roles;
        console.log(this.roles);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  isRoleExists(roleName: string): boolean {
    return this.roles.some(role => role.name === roleName);
  }

  validateStartDate(control: AbstractControl<any>): { [key: string]: any } | null {
    const selectedDate: Date = new Date(control.value);
    if (selectedDate >= this.workStartDate) {
      return null; // התאריך חוקי
    } else {
      return { 'invalidDate': true }; // התאריך לא חוקי
    }
  }

  // validateEntryDate() {
  //   const startDate = this.formBuilder.get('startDate').value;
  //   if (this.employee && new Date(startDate) < new Date(this.employee.employmentStartDate)) {
  //     this.formBuilder    } else {
  //     this.formBuilder['entryDate'].setErrors(null);
  //   }
  
  toggleAdmin(checked: boolean) {
    this.newEmpRoleForm.patchValue({
      isAdmin: checked
    });

  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  addRole(name: string) {
    console.log("addRole", name);
    const newRole: RolePost = {
      name: name
    }
    this.roleService.addRole(newRole).subscribe({
      next: (role: Role) => {
        this.roles.push(role);
        console.log(this.roles);
      },
      error: (err) => {
        console.log(err);
      }
    });

  }
  addEmpRole() {
    console.log("addEmpRoleCalled");
    if (!this.roles.find(role => role.name === this.newEmpRoleForm.value.name)) {
      this.addRole(this.newEmpRoleForm.value.name);
    }
    this.roleId = this.roles.find(role => role.name === this.newEmpRoleForm.value.name)!.id;
    if (!this.selectedRoles.includes(this.newEmpRoleForm.value.name)) {
      this.selectedRoles.push(this.newEmpRoleForm.value.name);
    }
    const newEmpRole: EmployeeRolePost = {
      roleId: this.roleId,
      empId: this.empId,
      startDate: this.newEmpRoleForm.value.startDate,
      isAdmin: this.newEmpRoleForm.value.isAdmin
    }
    this.employeesService.addRoleToEmployee(newEmpRole).subscribe({
      next: (response: any) => {
        this.data=response.data.employeeRole;
        console.log("newEmpRole", this.data);
        this.dialogRef.close(this.data);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}

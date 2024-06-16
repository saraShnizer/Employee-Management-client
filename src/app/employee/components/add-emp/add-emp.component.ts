import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormBuilder, FormControl, FormGroup, FormArray } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RoleFormDialogComponent } from '../role-form-dialog/role-form-dialog.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';


import { EmployeeRolePost } from '../../employeeRolePost.model';
import { Employee } from '../../employee.model';
import { EmployeesService } from '../../employees.service';
import { EmployeePost } from '../employeePost.model';
import { log } from 'node:console';

@Component({
  selector: 'app-add-emp',
  templateUrl: './add-emp.component.html',
  styleUrls: ['./add-emp.component.css'],
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    MatDialogModule,
    MatListModule,
    MatNativeDateModule,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatInputModule,
    MatDatepickerModule, // Import MatDatepickerModule
    MatButtonModule,
    MatDialogModule,
    MatListModule,
    MatNativeDateModule, // Import MatNativeDateModule
  ]
})
export class AddEmpComponent implements OnInit {

  @Input() data!: Employee;

  newEmpForm: FormGroup = this.formBuilder.group({

    identity: new FormControl("", [Validators.required, Validators.pattern(/^[0-9]{9}$/)]),
    firstName: new FormControl("", Validators.required),
    lastName: new FormControl("", Validators.required),
    birthDate: new FormControl("", Validators.required),
    startDate: new FormControl("", Validators.required),
    gender: new FormControl("", Validators.required),
    empRoles: this.formBuilder.array([])

  })

  isSaveClicked: boolean = false;
  currentEmpId!: number;

  constructor(private dialogRef: MatDialogRef<AddEmpComponent>, private formBuilder: FormBuilder, private dialog: MatDialog, private employeesService: EmployeesService) { }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  get empRoles(): FormArray {
    return this.newEmpForm.get('empRoles') as FormArray;

  }


  openAddRoleDialog() {
    const dialogRef = this.dialog.open(RoleFormDialogComponent, {
      data: {
        selectedRoles: this.empRoles.value.map((role: { name: string }) => role.name),
        workStartDate: this.newEmpForm.value.startDate,
        empId: this.currentEmpId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.empRoles.push(this.formBuilder.group(result));
        console.log("empRoles", this.empRoles.value);
      }
    });
  }

  deleteRole(i: number) {
    this.empRoles.removeAt(i);
  }


  addEmployee() {
    console.log("add emp")
    if (!this.newEmpForm.invalid) {
      let myGender: Number;
      if (this.newEmpForm.value.gender == "Male")
        myGender = 0;
      else
        myGender = 1;

      const employee: EmployeePost = {
        identity: this.newEmpForm.value.identity,
        firstName: this.newEmpForm.value.firstName,
        lastName: this.newEmpForm.value.lastName,
        birthDate: this.newEmpForm.value.birthDate,
        startDate: this.newEmpForm.value.startDate,
        gender: myGender
      }

      this.employeesService.addEmployee(employee).subscribe({
        next: (response: any) => {
          this.currentEmpId = response.id;
          console.log("currentEmpId", this.currentEmpId);
          console.log(response);
          // שלח את העובד החדש חזרה לקומפוננטת הטבלה
          this.dialogRef.close(response);
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }


}

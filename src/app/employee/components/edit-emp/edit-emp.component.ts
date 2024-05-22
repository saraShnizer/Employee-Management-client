  import { Component, Inject, Input, OnInit,inject} from '@angular/core';
  import { CommonModule } from '@angular/common';
  import { ReactiveFormsModule, Validators } from '@angular/forms';
  import { FormBuilder, FormControl, FormGroup, FormArray } from '@angular/forms';
  import { provideNativeDateAdapter } from '@angular/material/core';
  import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
  import { RoleFormDialogComponent } from '../role-form-dialog/role-form-dialog.component';
  import { MatInputModule } from '@angular/material/input';
  import { MatSelectModule } from '@angular/material/select';
  import { MatDatepickerModule } from '@angular/material/datepicker';
  import { MatNativeDateModule } from '@angular/material/core';
  import { MatFormFieldModule } from '@angular/material/form-field';
  import { MatListModule } from '@angular/material/list';
  import { MatIconModule } from '@angular/material/icon';
  import { MatButtonModule } from '@angular/material/button';



  import { EmployeeRolePost } from '../../employeeRolePost.model';
  import { Employee } from '../../employee.model';
  import { EmployeesService } from '../../employees.service';
  import { EmployeePost } from '../employeePost.model';
  
  @Component({
    selector: 'app-edit-emp',
    templateUrl: './edit-emp.component.html',
    styleUrls: ['./edit-emp.component.css'],
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
      MatDatepickerModule, 
      MatButtonModule,
      MatDialogModule,
      MatListModule,
      MatNativeDateModule,
    
    ]
  })
  export class EditEmpComponent implements OnInit {
  
    @Input() data!: Employee;

  
    newEmpForm !: FormGroup ;

    isSaveClicked: boolean = false;
    currentEmpId!:number;
    updatedEmployeeIndex!: number;
    
  
    constructor(private formBuilder: FormBuilder, private dialog: MatDialog, private employeesService: EmployeesService,
      @Inject(MAT_DIALOG_DATA) public employeeData: Employee) { }
    ngOnInit(): void {
      console.log(this.employeeData)
      this.newEmpForm= this.formBuilder.group({
        identity: new FormControl(this.employeeData.identity, [Validators.required, Validators.pattern(/^[0-9]{9}$/)]),
        firstName: new FormControl(this.employeeData.firstName, Validators.required),
        lastName: new FormControl(this.employeeData.lastName, Validators.required),
        birthDate: new FormControl(this.employeeData.birthDate, Validators.required),
        startDate: new FormControl(this.employeeData.startDate, Validators.required),
        gender: new FormControl(this.employeeData.gender, Validators.required),
        empRoles: this.formBuilder.array([])
    
      })

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
    onNoClick(): void {
      this.dialog.closeAll();
    }
    deleteRole(i: number) {
      this.empRoles.removeAt(i);
    }
  
  
   updateEmployee() {
      if (!this.newEmpForm.invalid) {
        let myGender: Number;
       
        const employee: EmployeePost = {
          identity: this.newEmpForm.value.identity,
          firstName: this.newEmpForm.value.firstName,
          lastName: this.newEmpForm.value.lastName,
          birthDate: this.newEmpForm.value.birthDate,
          startDate: this.newEmpForm.value.startDate,
          gender: this.newEmpForm.value.gender

        }
  
        this.employeesService.updateEmployee(this.employeeData.id, employee).subscribe({
          next: (response:any) => {
        console.log("afterUpdate",response);
        // this.dialog.closeAll();

          },
          error: (err) => {
            console.log(err);
          }
        });
      }
     this.isSaveClicked=true;
    }
    close(){
      this.dialog.closeAll(); 
    }

}

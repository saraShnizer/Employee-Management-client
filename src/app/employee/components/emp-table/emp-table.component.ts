import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import * as XLSX from 'xlsx';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { EmployeesService } from '../../employees.service';
import { Employee } from '../../employee.model';
import { EditEmpComponent } from '../edit-emp/edit-emp.component';
import { AddEmpComponent } from '../add-emp/add-emp.component';

@Component({
  selector: 'app-emp-table',
  standalone: true,
  imports: [
    CommonModule,
    MatPaginator,
    MatPaginatorModule,
    MatSort,
    MatSortModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    EditEmpComponent,
    MatButtonModule,
    MatIconModule,
    AddEmpComponent,


  ],
  templateUrl: './emp-table.component.html',
  styleUrl: './emp-table.component.css'
})
export class EmpTableComponent implements OnInit {

  formInstance!: FormGroup;
  displayedColumns: string[] = ['firstName', 'lastName', 'Identity', 'startDate', 'delete', 'edit'];
  dataSource!: MatTableDataSource<Employee>;
  filterForm = new FormGroup({
    filterValue: new FormControl("")

  });
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



  constructor(
    private router: Router,
    private employeesService: EmployeesService,
    private dialog: MatDialog
    // public dialogRef: MatDialogRefa<EditEmpComponent>,
    // @Inject(MAT_DIALOG_DATA) public data: Employee
    // private formBuilder: FormBuilder
  ) {
    // this.filterForm = this.formBuilder.group({
    //   filterValue: ['']
    // });
    // console.log("filterValue: ",this.filterForm.value.filterValue);
  }

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void {
    this.employeesService.getEmployeesList().subscribe({
      next: (employees) => {
        this.dataSource = new MatTableDataSource(employees);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(employees);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  applyFilter() {
    const filterValue = this.filterForm.value.filterValue;
    if (filterValue) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
      console.log("filter work", filterValue);
      console.log("filterValue", this.filterForm.value.filterValue);
    }
    else {
      this.getEmployees();
    }
  }


  // editEmpDetails(empID: number) {
  //   this.router.navigate(['app-edit-emp/' + empID]);
  // }
  deleteEmpDetails(empID: number) {
    this.employeesService.deleteEmployee(empID).subscribe({
      next: (employees) => {
        this.dataSource.data = this.dataSource.data.filter(x => x.id != empID);
      },
      error: (err) => {
        console.log(err);
      }
    });
    this.getEmployees();




  }
  openEditEmpDialog(employee: Employee) {
    const dialogRef = this.dialog.open(EditEmpComponent, {
      
      data: employee,
      width:'50%'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getEmployees();

      if (result) { // Check if employee was updated
        const updatedEmployeeIndex = this.dataSource.data.findIndex(e => e.id === result.id);
        if (updatedEmployeeIndex > -1) {
          // this.dataSource.data[updatedEmployeeIndex] = result;
          // this.dataSource.data = [...this.dataSource.data];
          // this.dataSource.paginator = this.paginator;
          // this.dataSource.sort = this.sort;
          // console.log("afterUpdate",this.dataSource.data[updatedEmployeeIndex] );
        }
      }
    });
    console.log("aftrerClosed");
    
    // this.getEmployees();


  }

  openAddEmpDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '60%'; // הגדרת רוחב ה-dialog ל-60% מהמסך
    dialogConfig.maxWidth = '800px'; // אם תרצה להגביל את הרוחב המקסימלי, ניתן להשתמש ב-maxWidth
  
    const dialogRef = this.dialog.open(AddEmpComponent, dialogConfig);
  


    dialogRef.afterClosed().subscribe(result => {
      console.log("result", result);  
      this.openEditEmpDialog(result);
      this.getEmployees();
    });
  }
  downloadExcel() {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataSource.data);
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Employee Data');
    XLSX.writeFile(workbook, 'Employee_Data.xlsx');
  }
}


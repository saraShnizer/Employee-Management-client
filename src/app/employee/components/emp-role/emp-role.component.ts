import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeesService } from '../../employees.service';
import { EmployeeRolePost } from '../../employeeRolePost.model';
import { Employee } from '../../employee.model';
import { CommonModule } from '@angular/common';
import { RolesService } from '../../../role/roles.service';
import { EmployeeRole } from '../../employeeRole.model';
import { RoleFormDialogComponent } from '../role-form-dialog/role-form-dialog.component';
import { Role } from '../../../role/role.model';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { EditEmpRoleComponent } from '../edit-emp-role/edit-emp-role.component';

@Component({
  selector: 'app-emp-role',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule],
  templateUrl: './emp-role.component.html',
  styleUrls: ['./emp-role.component.css']
})
export class EmpRoleComponent implements OnInit {
  @Input() employee!: Employee;
  employeeRoles: EmployeeRole[] = [];
  allRoles: Role[] = [];
  
  displayedColumns: string[] = ['roleName','startDate','isAdmin', 'actions'];


  constructor(private employeesService: EmployeesService, private rolesService: RolesService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadEmployeeRoles();
    this.loadAllRoles();
  }

  loadEmployeeRoles() {
    this.employeesService.getEmployeePositionById(this.employee.id).subscribe({
      next: (roles) => {
        this.employeeRoles = roles;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  loadAllRoles() {
    this.rolesService.getRolesList().subscribe({
      next: (roles) => {
        this.allRoles = roles;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  deleteRole(roleId: number) {
    this.employeesService.deleteEmployeeRole(this.employee.id, roleId).subscribe({
      next: () => {
        this.loadEmployeeRoles();
      },
      error: (err) => {
        console.log(err);
      }
    });
    this.loadEmployeeRoles();

  }

  editRole(role: EmployeeRolePost) {
    const dialogRef = this.dialog.open(EditEmpRoleComponent, {
      data: { role }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.employeesService.updateEmployeeRole(this.employee.id, role.roleId, result).subscribe({
          next: () => {
            this.loadEmployeeRoles();
          },
          error: (err) => {
            console.log(err);
          }
        });
      }
    });
  }
  openAddRoleDialog() {
    const availableRoles = this.allRoles.filter(
      (role) => !this.employeeRoles.some((empRole) => empRole.roleId === role.id)
    );

    const dialogRef = this.dialog.open(RoleFormDialogComponent, {
      data: {
        availableRoles: availableRoles,
        employeeId: this.employee.id
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
    
        this.loadEmployeeRoles();
  
    });
  }
}

import { Role } from "../role/role.model";
import { Employee } from "./employee.model";

export class EmployeeRole {
    id!: number;
    roleId!: number;
    empId!: number;
    role !: Role;
    emp !: Employee;
    startDate!:Date;
    isAdmin!:boolean;
  }
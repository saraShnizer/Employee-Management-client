import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { Employee } from './employee.model';
import { EmployeeRolePost } from './employeeRolePost.model';
import { EmployeePost } from './components/employeePost.model';
import { EmployeeRole } from './employeeRole.model';


@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  // public lang: BehaviorSubject<string> = new BehaviorSubject<string>('en')

  constructor(private _http: HttpClient) { }

  getEmployeesList(): Observable<Employee[]> {
    return this._http.get<Employee[]>(`https://localhost:7283/api/employees`)
  }
  getEmployeeById(id: number): Observable<Employee> {
    return this._http.get<Employee>(`https://localhost:7283/api/employees/${id}`)
  }
  addEmployee(emp: EmployeePost) {
    return this._http.post(`https://localhost:7283/api/employees`, emp)
   
  }
  deleteEmployee(id:number) {
    return this._http.delete(`https://localhost:7283/api/employees/${id}`)
   
  }
  updateEmployee(id:number,emp: EmployeePost) {
    return this._http.put(`https://localhost:7283/api/Employees/${id}`, emp)
   
  }

  addRoleToEmployee( empid : number,empRole: EmployeeRolePost) {
    return this._http.post(`https://localhost:7283/api/employees/${empid}/roles`, empRole)
  }
  getEmployeePositionById(id: number): Observable<EmployeeRole[]> {
    return this._http.get<EmployeeRole[]>(`https://localhost:7283/api/employees/${id}/roles`)
  }
  // changeLang(lang: string) {
  //   this.lang.next(lang)
  // }

  deleteEmployeeRole(employeeId: number, roleId: number) {
    return this._http.delete(`https://localhost:7283/api/employees/${employeeId}/roles/${roleId}`);
  }
  updateEmployeeRole(employeeId: number, roleId: number, role: EmployeeRolePost) {
    return this._http.put(`https://localhost:7283/api/employees/${employeeId}/roles/${roleId}`, role);
  }
  
}

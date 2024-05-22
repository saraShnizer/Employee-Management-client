import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { Employee } from './employee.model';
import { EmployeeRolePost } from './employeeRolePost.model';
import { EmployeePost } from './components/employeePost.model';


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

  addRoleToEmployee( empRole: EmployeeRolePost) {
    return this._http.post(`https://localhost:7283/api/employees/roles`, empRole)
  }
  
  // changeLang(lang: string) {
  //   this.lang.next(lang)
  // }

}

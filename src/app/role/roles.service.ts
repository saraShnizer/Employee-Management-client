import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from './role.model';
import { RolePost } from './rolePost.model';



@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private http: HttpClient) { }

  getRolesList(): Observable<Role[]> {
    return this.http.get<Role[]>('https://localhost:7283/api/roles');
  }

  getRoleById(id: number): Observable<Role> {
    return this.http.get<Role>(`https://localhost:7283/api/roles/${id}`);
  }

  addRole(role: RolePost): Observable<Role> {
    return this.http.post<Role>('https://localhost:7283/api/roles', role);
  }

  updateRole(id: number, role: Role): Observable<Role> {
    return this.http.put<Role>(`https://localhost:7283/api/roles/${id}`, role);
  }

  deleteRole(id: number): Observable<void> {
    return this.http.delete<void>(`https://localhost:7283/api/roles/${id}`);
  }
}

